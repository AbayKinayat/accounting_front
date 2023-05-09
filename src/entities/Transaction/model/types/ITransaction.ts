export interface ITransaction {
  id: number, 
  name: string,
  amount: number,
  categoryId: number,
  userId: number,
  typeId: number,
  createdAt: number, 
  updatedAt: number
}