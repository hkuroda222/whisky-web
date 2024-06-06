'use client';
import React, { useState, useEffect } from 'react';

type RatingProps = {
  rating: number;
  size?: number;
  color?: string;
  readOnly?: boolean;
  withLabel?: boolean;
  onClick?: (value: number) => void;
};

export const Rating = (props: RatingProps) => {
  const {
    rating,
    size = 24,
    color = '#f9ce20',
    readOnly = false,
    withLabel = false,
    onClick,
  } = props;

  const [hoverValue, setHoverValue] = useState(rating);
  const [clickValue, setClickValue] = useState(rating);
  const [isHovered, setIsHovered] = useState(false);
  const arr = [1, 2, 3, 4, 5];

  useEffect(() => {
    setHoverValue(rating);
    setClickValue(rating);
  }, [rating]);

  const calcRes = (
    amount: number,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const clickX = event.pageX;
    const positionX = rect.left + window.pageXOffset;
    const x = clickX - positionX;
    const half = rect.width / 2;
    let res = amount;
    if (x < half) {
      res = amount - 0.5;
    }
    return res;
  };

  const handleOnClick = (
    amount: number,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const res = calcRes(amount, event);
    setClickValue(res);
    setHoverValue(res);
    if (onClick) {
      onClick(res);
    }
  };

  const handleOnHover = (
    amount: number,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setIsHovered(true);
    const res = calcRes(amount, event);
    setHoverValue(res);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative inline-block select-none items-center"
        style={{
          cursor: readOnly ? 'auto' : 'pointer',
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <div
          className="flex overflow-hidden whitespace-nowrap text-[#e6e6e6]"
          style={{
            fontSize: `${size}px`,
          }}
        >
          {arr.map((num: number) => {
            return (
              <span
                key={`star-${num}`}
                className="p-0.5"
                onMouseMove={readOnly ? () => {} : (e) => handleOnHover(num, e)}
                onClick={readOnly ? () => {} : (e) => handleOnClick(num, e)}
              >
                &#9734;
              </span>
            );
          })}
        </div>
        <div
          className="absolute left-0 top-0 flex overflow-hidden whitespace-nowrap"
          style={{
            color: color,
            fontSize: `${size}px`,
            width: isHovered
              ? `${hoverValue * 2 * 10}%`
              : `${clickValue * 2 * 10}%`,
            pointerEvents: 'none',
          }}
        >
          {arr.map((num: number) => {
            return (
              <span key={`star-active-${num}`} className="p-0.5">
                &#9733;
              </span>
            );
          })}
        </div>
      </div>
      {withLabel ? (
        <span className="font-bold" style={{ fontSize: `${size * 0.65}px` }}>
          {clickValue}
        </span>
      ) : null}
    </div>
  );
};
