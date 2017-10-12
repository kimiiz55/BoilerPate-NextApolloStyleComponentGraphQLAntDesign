export default {
  Query: {
    allCats: async (parent,args ,{ Catf }) => {
      // { _id: 123123, name: "whatever"}
      const catd = await Catf.find();
      return catd.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
  },
  Mutation: {
    createCat: async ( parent,args, { Catf }) => {
      // { _id: 123123, name: "whatever"}
      const kitty = await new Catf(args).save();
      kitty._id = kitty._id.toString();
      return kitty;
    },
  },
};
