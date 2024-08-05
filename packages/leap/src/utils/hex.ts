import { bytesToHex, hexToBytes } from "@utxo-stack/branch";

export const remove0x = (hex: string): string => {
  if (hex.startsWith('0x')) {
    return hex.substring(2);
  }
  return hex;
};

export const append0x = (hex?: string): string => {
  return hex?.startsWith('0x') ? hex : `0x${hex}`;
};

const ArrayBufferToHex = (arrayBuffer: ArrayBuffer): string => {
  return Array.prototype.map.call(new Uint8Array(arrayBuffer), (x) => ('00' + x.toString(16)).slice(-2)).join('');
};

export const u8ToHex = (u8: number): string => {
  const buffer = new ArrayBuffer(1);
  const view = new DataView(buffer);
  view.setUint8(0, u8);
  return ArrayBufferToHex(buffer);
};

export const utf8ToHex = (text: string) => {
  let result = text.trim();
  if (result.startsWith('0x')) {
    return result;
  }
  result = bytesToHex(new TextEncoder().encode(result));
  return result;
};

export const hexToUtf8 = (hex: string) => {
  let result = hex.trim();
  try {
    result = new TextDecoder().decode(hexToBytes(result));
  } catch (error) {
    console.error('hexToUtf8 error:', error);
  }
  return result;
};
