const _ = require('lodash');

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
                                                title: 'Reviewer(s)',
                                                value: reviewers,
                                                short: true
                                        }
                                ],
                                color: color()
                        }
                ]
        }
};
