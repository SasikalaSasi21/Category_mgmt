const CategoryModel = require('../model/category')

// Create and Save a new category
exports.create = async (req, res) => {
    if (!req.body.data) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    const category = new CategoryModel({
        name: req.body.name,
        imageUrlgeUrl: req.body.imageUrl,
        isActive: req.body.isActive
    });
    await category.save().then(data => {
        res.send({
            message:"Category created successfully!!",
            category:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating category"
        });
    });
};

// Retrieve all category from the database.
exports.findAll = async (req, res) => {
    try {
        // pagination in retrieve all category from the Database using limit, skip
        const limitValue = req.query.limit;
        const skipValue = req.query.skip;
        const sortValue = req.query.sort;
        const category = await CategoryModel.find()
            .limit(limitValue).skip(skipValue).sort(sortValue);
        res.status(200).json(category);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single category with an id
exports.findOne = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        res.status(200).json(category);
        console.log(category);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a category by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    await CategoryModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: 'Category not found'
            });
        }else{
            res.send({ message: "Category updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a category with the specified id in the request
exports.destroy = async (req, res) => {
    await CategoryModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: 'Category not found'
          });
        } else {
          res.send({
            message: "Category deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};
