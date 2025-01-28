import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// create category controller
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body; // getting the name of the category.
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
              success: true,
              message: "Category Already Exists",
            });
        }

        const category = await new categoryModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category",
          });
    }
};

// update Category Controller
export const updateCategoryController = async (req, res) => {
    try {
      const { name } = req.body; // since we want to modify the name
      const { id } = req.params;  // we'll get the id from the url
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating the category",
      });
    }
};

// get all category controller
export const categoryController = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all the categories",
      });
    }
};

// single category controller
export const singleCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Category retrieved successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting a Single Category",
      });
    }
};

//delete category controller
export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params; // we'll get from url
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while Deleting the category",
        error,
      });
    }
};