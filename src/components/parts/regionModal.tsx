"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/elements/button";
import { Modal } from "@/components/parts/modal";
import { REGION } from "@/libs/data/region";

type DistilleryModalProps = {
  closeModal: () => void;
  onSubmit: (data: { region: string }) => void;
  resetValue: () => void;
  value: string;
};

export const RegionModal: React.FC<DistilleryModalProps> = (props) => {
  const { closeModal, onSubmit, resetValue, value } = props;
  const { handleSubmit, register, setValue, reset } = useForm<{
    region: string;
  }>({ defaultValues: { region: value } });

  return (
    <Modal modalTiele="地域を選択してください">
      <form onSubmit={handleSubmit(onSubmit)}>
        {REGION.map((regionData, i) => {
          return (
            <div key={`country-${i}`}>
              <span className="block mt-4 font-bold">{regionData.country}</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {regionData.region.map((region) => {
                  return (
                    <div key={`region-${region.id}`} className="mt-2">
                      <input
                        id={region.regionName}
                        type="radio"
                        value={region.regionName}
                        {...register("region")}
                        onChange={(e) => {
                          setValue("region", e.target.value);
                        }}
                        hidden
                        className="peer"
                      />
                      <label
                        htmlFor={region.regionName}
                        className="px-2 py-1 border-solid border-2 border-gray-400 rounded peer-checked:bg-gray-300"
                      >
                        {region.regionName}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="flex mt-4">
          <div className="w-full">
            <Button
              type="button"
              color="white"
              text="選択しない"
              onClick={() => {
                reset({ region: "" });
                resetValue();
                closeModal();
              }}
            />
          </div>
          <div className="ml-6 w-full">
            <Button type="submit" color="white" text="決定" />
          </div>
        </div>
      </form>
    </Modal>
  );
};
