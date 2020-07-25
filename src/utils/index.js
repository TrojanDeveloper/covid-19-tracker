import numeral from 'numeral'

export const formatNumber = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : '+0'