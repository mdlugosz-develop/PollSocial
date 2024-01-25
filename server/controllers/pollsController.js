const Poll = require('../models/Poll')
const Vote = require('../models/Vote')
const User = require('../models/User')

const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body
        const { userId } = req

        const newPoll = new Poll({
            creator: userId,
            question,
            options
        })

        const savedPoll = await newPoll.save()
        res.json(savedPoll)

    } catch (err) {

        res.status(500).json({
            message: "Error creating post",
            error: err
        });

    }
}

const votePoll = async (req, res) => {
    try {
        const { pollId, optionId } = req.body
        const { userId } = req

        const existingVote = await Vote.findOne({ pollId, voter: userId })
        if (existingVote) {
            return res.status(400).json({ message: 'User has already voted for this poll' });
        }

        const poll = await Poll.findById(pollId)
        if (!poll) {
            return res.status(404).send('Poll not found');
        }

        const option = poll.options.find(opt => opt._id.equals(optionId));
        if (!option) {
            return res.status(404).json({ message: 'Option not found in the poll' });
        }

        const newVote = new Vote({ pollId: pollId, voter: userId, optionId: optionId });
        const savedVote = await newVote.save();

        option.votes += 1;
        await poll.save();

        res.status(201).json({ message: 'Vote recorded successfully' });


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}

const getAllPolls = async (req, res) => {
    const polls = await Poll.find().lean()
    if (!polls?.length) {
        return res.status(400).json({ message: 'No Polls found' })
    }

    //add username to each poll

    const pollsWithUser = await Promise.all(polls.map(async (poll) => {
        const user = await User.findById(poll.creator).lean().exec()
        return { ...poll, username: user.username }
    }))
    res.json(pollsWithUser)
}

const getPoll = async (req, res) => {
    try {
        const pollId = req.params.id;
        const poll = await Poll.findById(pollId)

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' })
        }

        res.status(200).json(poll)
    } catch (err) {
        res.status(500).json({ message: 'Error getting post' })
    }
}

const deletePoll = async (req, res) => {
    try {
        const id = req.params.id
        const poll = await Poll.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' })
        }

        await poll.remove();
        res.status(200).json({ message: 'post deleted successfully' })

    } catch (err) {
        res.status(404).json({ message: 'error while deleting th epost' })

    }
}

module.exports = {
    getAllPolls,
    getPoll,
    createPoll,
    deletePoll,
    votePoll,
}