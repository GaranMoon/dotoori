// ColorMap 키 구하기
export const getColorMapKey = (xIndex: number, yIndex: number) => {
  return `${xIndex.toString().padStart(2, '0')}${yIndex.toString().padStart(2, '0')}`;
};
