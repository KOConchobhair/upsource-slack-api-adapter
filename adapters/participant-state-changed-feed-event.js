const _ = require('lodash');
const config = require('../config.json');

module.exports = function(review) {
	const reviewers = _.chain(review).get('data.base.userIds', []).map('userName').value().join(', ');
        const reviewState  = {
                0: '_Unread_',
                1: '_Read_',
                2: '_Accepted_',
                3: '_Raised Concern_'
        };

        const color = (function() {
                if (review.data.newState === 3) return '#F35A00';
                if (review.data.newState === 2) return '#2AB27B';

                return '#00CCCC'
        });

        return {
		text: `Review #${review.data.base.reviewNumber}: Participant state changed from ${reviewState[review.data.oldState]} to ${reviewState[review.data.newState]}`,
                attachments: [
                       {
				fallback: `Review #${review.data.base.reviewNumber}: Participant state changed from ${reviewState[review.data.oldState]} to ${reviewState[review.data.newState]}`,
                                fields: [
                                        {
                                                title: 'Project',
                                                value: review.projectId,
                                                short: true
                                        },
                                        {
                                                title: 'Changed by',
                                                value: review.data.participant.userName,
                                                short: true
                                        },
					{
						title: 'Link',
						value: '<' + config.upsourceUrl + '/' + review.projectId + '/review/' + review.data.base.reviewId + '|' + review.data.base.reviewId + '>'
					}

                                ],
                                color: color()
                        }
                ]
        }
};
