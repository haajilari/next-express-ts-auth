// با استفاده از interface، شکل و ساختار آبجکت کاربر را تعریف می‌کنیم
export interface User {
  id: number;
  email: string;
  passwordHash: string; // توجه کنید که ما password را ذخیره نمی‌کنیم، بلکه هش آن را
}
