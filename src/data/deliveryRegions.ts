export type KenyaRegionKey =
  | 'nairobi'
  | 'central'
  | 'western'
  | 'coast'
  | 'rift_valley'
  | 'eastern'
  | 'nyanza'
  | 'north_eastern'
  | 'other';

export interface KenyaRegionInfo {
  key: KenyaRegionKey;
  label: string;
  feeKsh: number;
  countiesSample: string;
  estimatedTime: string;
}

export const KENYA_DELIVERY_REGIONS: KenyaRegionInfo[] = [
  {
    key: 'nairobi',
    label: 'Nairobi Metropolis',
    feeKsh: 200,
    countiesSample: 'Nairobi, Westlands, Kilimani, Karen, Kasarani, Embakasi',
    estimatedTime: 'Same Day / 24 Hours Express',
  },
  {
    key: 'central',
    label: 'Central Kenya',
    feeKsh: 300,
    countiesSample: 'Kiambu, Nyeri, Murang\'a, Kirinyaga, Nyandarua',
    estimatedTime: '24 - 48 Hours Express Courier',
  },
  {
    key: 'western',
    label: 'Western Kenya',
    feeKsh: 500,
    countiesSample: 'Kakamega, Bungoma, Busia, Vihiga',
    estimatedTime: '2 - 3 Days Direct Freight',
  },
  {
    key: 'coast',
    label: 'Coastal Kenya',
    feeKsh: 600,
    countiesSample: 'Mombasa, Kilifi, Kwale, Lamu, Malindi, Taita Taveta',
    estimatedTime: '2 - 3 Days Coastal Express',
  },
  {
    key: 'rift_valley',
    label: 'Rift Valley Region',
    feeKsh: 500,
    countiesSample: 'Nakuru, Uasin Gishu (Eldoret), Kajiado, Narok, Kericho, Bomet',
    estimatedTime: '2 - 3 Days Regional Courier',
  },
  {
    key: 'eastern',
    label: 'Eastern Region',
    feeKsh: 500,
    countiesSample: 'Machakos, Kitui, Makueni, Meru, Embu, Isiolo',
    estimatedTime: '2 - 3 Days Regional Courier',
  },
  {
    key: 'nyanza',
    label: 'Nyanza Basin',
    feeKsh: 500,
    countiesSample: 'Kisumu, Kisii, Homa Bay, Siaya, Nyamira, Migori',
    estimatedTime: '2 - 3 Days Regional Courier',
  },
  {
    key: 'north_eastern',
    label: 'North Eastern Region',
    feeKsh: 500,
    countiesSample: 'Garissa, Wajir, Mandera, Marsabit',
    estimatedTime: '3 - 4 Days Extended Freight',
  },
  {
    key: 'other',
    label: 'Other Kenyan Counties',
    feeKsh: 500,
    countiesSample: 'All other locations within Kenya',
    estimatedTime: '2 - 4 Business Days',
  },
];

export const getDeliveryRegionInfo = (key: KenyaRegionKey): KenyaRegionInfo => {
  return (
    KENYA_DELIVERY_REGIONS.find((r) => r.key === key) || {
      key: 'other',
      label: 'Other Kenyan Counties',
      feeKsh: 500,
      countiesSample: 'All other locations within Kenya',
      estimatedTime: '2 - 4 Business Days',
    }
  );
};
