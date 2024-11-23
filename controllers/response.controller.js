const Response = require('../models/response.model');

const createResponse = async (req, res, next) => {
    try {
        console.log('Creating response with data:', req.body);
        
        const response = await Response.create({
            responseType: req.body.responseType,
            description: req.body.description,
            location: req.body.location
        });
        
        console.log('Response created successfully:', response);
        res.status(201).json(response);
        
    } catch (error) {
        console.error('Error in createResponse:', error);
        next(error);
    }
};

const getAllResponses = async (req, res, next) => {
    try {
        console.log('Fetching paginated responses');
        
        // Get pagination parameters from query, with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Get sort direction from query, default to descending (newest first)
        const sortOrder = req.query.order === 'asc' ? 1 : -1;
        
        // Get total count for pagination metadata
        const total = await Response.countDocuments();
        
        // Fetch paginated responses with sorting by timestamp
        const responses = await Response.find()
            .sort({ timestamp: sortOrder }) // Sort by timestamp
            .skip(skip)
            .limit(limit);
        
        console.log(`Found ${responses.length} responses for page ${page}`);
        
        res.status(200).json({
            responses,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalResponses: total,
                hasNext: skip + responses.length < total,
                hasPrev: page > 1,
                sortOrder: sortOrder === 1 ? 'ascending' : 'descending'
            }
        });
        
    } catch (error) {
        console.error('Error in getAllResponses:', error);
        next(error);
    }
};
const updateVote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        // Validate vote value is either 1 or -1
        if (value !== 1 && value !== -1) {
            return res.status(400).json({ message: 'Vote value must be 1 or -1' });
        }

        // Find and update the response
        const response = await Response.findByIdAndUpdate(
            id,
            { $inc: { votes: value } }, // Increment votes by value
            { new: true } // Return updated document
        );

        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }

        console.log('Vote updated successfully:', response);
        res.status(200).json(response);

    } catch (error) {
        console.error('Error in updateVote:', error);
        next(error);
    }
};





module.exports = {
    createResponse,
    getAllResponses,
    updateVote
};
