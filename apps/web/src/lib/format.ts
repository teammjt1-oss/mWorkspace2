const krw = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" });

export function formatKRW(amount: number): string {
  return krw.format(amount);
}
