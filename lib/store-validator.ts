const storeMaster = [
  { store_id: "RP00038", store_name: "Himul titly", area_code: "7100015" },
  { store_id: "RP00039", store_name: "MS GANDHESWARI ENTERPRISE", area_code: "7100015" },
  { store_id: "RP00040", store_name: "Devnath bhandar", area_code: "7100015" },
  { store_id: "RP00041", store_name: "Kundu bandar", area_code: "7100015" },
  { store_id: "RP00042", store_name: "Mohit trali like", area_code: "7100015" },
  { store_id: "RP00043", store_name: "ASHOK KUMAR PAUL", area_code: "7100015" },
  { store_id: "RP00044", store_name: "Kundu pan ghar", area_code: "7100015" },
  { store_id: "RP00045", store_name: "Manoka store", area_code: "7100015" },
  { store_id: "RP00046", store_name: "ANJALI BHANDARS", area_code: "7100015" },
  { store_id: "RP00047", store_name: "jyostna mayee store", area_code: "7100015" },
  { store_id: "RP00048", store_name: "Disha stores", area_code: "7100015" },
  { store_id: "RP00049", store_name: "The green music", area_code: "7100015" },
  { store_id: "RP00050", store_name: "Shiv bhandar", area_code: "7100015" },
  { store_id: "RP00051", store_name: "Love Fine", area_code: "7100015" },
  { store_id: "RP00052", store_name: "T K Joy", area_code: "7100015" },
  { store_id: "RP00053", store_name: "Sima store", area_code: "7100015" },
  { store_id: "RP00054", store_name: "LOKNATH BHANDER", area_code: "7100015" },
  { store_id: "RP00055", store_name: "Banty shoppe", area_code: "7100015" },
  { store_id: "RP00056", store_name: "neeccssity enterprises", area_code: "7100015" },
  { store_id: "RP00057", store_name: "S communication", area_code: "7100015" },
  { store_id: "RP00058", store_name: "poddar stores", area_code: "7100015" },
  { store_id: "RP00059", store_name: "SWARNO BHANDAR", area_code: "7100015" },
  { store_id: "RP00060", store_name: "nigam store", area_code: "7100015" },
  { store_id: "RP00061", store_name: "ANKUR PAN GHAR", area_code: "7100015" },
  { store_id: "RP00062", store_name: "PAUL VAREITY STORE", area_code: "7100015" },
  { store_id: "RP00063", store_name: "RENUKA BHANDER", area_code: "7100015" },
  { store_id: "RP00064", store_name: "PITRIMATRI GENERAL STORE", area_code: "7100015" },
  { store_id: "RP00065", store_name: "PRIYA BHANDER", area_code: "7100015" },
  { store_id: "RP00066", store_name: "Bhai bhai pan ghar", area_code: "7100015" },
  { store_id: "RP00067", store_name: "Netaji store", area_code: "7100015" },
  { store_id: "RP00068", store_name: "Haldar stores", area_code: "7100015" },
  { store_id: "RP00069", store_name: "JOYGURU BHANDER", area_code: "7100015" },
  { store_id: "RP00070", store_name: "Ghash bhandar", area_code: "7100015" },
  { store_id: "RP00071", store_name: "LOKENATH COMMUNICATION", area_code: "7100015" },
  { store_id: "RP00072", store_name: "Parna stores", area_code: "7100015" },
  { store_id: "RP00073", store_name: "New Basck stores", area_code: "7100015" },
  { store_id: "RP00074", store_name: "RAI BHANDER", area_code: "7100015" },
]

// Validate store IDs
export function validateStoreIds(storeIds: string[]): string[] {
  const validStoreIds = new Set(storeMaster.map((store) => store.store_id))
  return storeIds.filter((id) => !validStoreIds.has(id))
}

// Get store details by ID
export function getStoreDetails(storeId: string) {
  return storeMaster.find((store) => store.store_id === storeId)
}

