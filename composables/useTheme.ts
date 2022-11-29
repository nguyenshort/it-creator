export const colorsColection = [
  '#8338ec',
  '#5534A5',
  '#005555',
  '#0078AA',
  '#E94560',
  '#242F9B',
  '#464F41',
  '#3a0ca3',
  '#5f0f40',
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad'
]

export const sparklingMap: Array<{
  width: number
  height: number
  position: [number, number]
}> = [
  {
    width: 108,
    height: 113,
    position: [-18, -12]
  },
  {
    width: 138,
    height: 138,
    position: [-215, 0]
  },
  {
    width: 139,
    height: 107,
    position: [-433, -15]
  },
  {
    width: 125,
    height: 125,
    position: [-658, -6]
  },
  {
    width: 120,
    height: 120,
    position: [-880, -9]
  },
  {
    width: 131,
    height: 126,
    position: [0, -203]
  },
  {
    width: 118,
    height: 118,
    position: [-205, -201]
  },
]



export const useTheme = () => {
  return {
    colorFactory: () => colorsColection[Math.floor(Math.random() * colorsColection.length)],
    sparkFactory: () => sparklingMap[Math.floor(Math.random() * sparklingMap.length)],
  }
}
