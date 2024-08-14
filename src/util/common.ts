// ColorMap 키 구하기
export const getColorMapKey = (xIndex: number, yIndex: number) => {
  return `${xIndex.toString().padStart(2, '0')}${yIndex.toString().padStart(2, '0')}`;
};

// camelCase 사이에 띄어쓰기 넣기
export const cutWords = (text: string) => {
  return text.replace(/([A-Z])/g, ' $1').trim();
};
