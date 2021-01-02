import Lanche from "../models/Lanche"

export default {
  render(lanche: Lanche) {
    return {
      id: lanche.id,
      name: lanche.name,
      price: lanche.price,
      image : `http://127.0.0.1:3333/uploads/${lanche.image}`,
      category: lanche.category_id
    }
  },

  renderMany(lanches: Lanche[]) {
    return lanches.map(lanche => this.render(lanche))
  }
}