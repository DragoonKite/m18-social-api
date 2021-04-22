const {Thought, User} = require('../models')

const thoughtController = {
    //get all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get thought by id
    getThoughtById({params}, res) {
        User.findOne({_id: params.id})
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(dbThoughtData => {
                //If no user is found, send 404
                if(!dbThoughtData) {
                    res.status(404).json({message: 'Thought not found!'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create new thought & update associated user
    createThought ({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id} },
                {new: true}
            )
        })
        .then(dbUserData => {
            if (!dbUsertData) {
              res.status(404).json({ message: 'User not found!' });
              return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //update thought by id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'Thought not found!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete thought by id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'Thought not found!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
    },

    //create reaction to single thought
    addReaction({params,body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'Thought not found!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    //delete reaction to single thought
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;