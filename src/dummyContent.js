
let rawContent = {
	blocks: [
		{
			text: (
				'This is an "immutable" entity: Superman. Deleting any ' +
				'characters will delete the entire entity. Adding characters ' +
				'will remove the entity from the range.'
				),
				type: 'unstyled',
				entityRanges: [{offset: 31, length: 8, key: 'first'}],
			},
			{
				text: 'http://41.media.tumblr.com/bb99b1b99a707ce36f95a14e92247d97/tumblr_nrhfswPPGQ1ub5poho1_500.png',
				type: 'image',
			},
			{
				text: '',
				type: 'unstyled',
			},
			{
				text: (
					'This is a "mutable" entity: Batman. Characters may be added ' +
					'and removed.'
					),
					type: 'unstyled',
					entityRanges: [{offset: 28, length: 6, key: 'second'}],
				},
				{
					text: (
						'That is non entity'
						),
          type: 'unstyled',
          entityRanges: [{offset: 30, length: 13, key: 'third'}],
        },
				{
					text: '',
					type: 'unstyled',
				},
				{
					text: (
						'This is a "segmented" entity: Green Lantern. Deleting any ' +
						'characters will delete the current "segment" from the range. ' +
						'Adding characters will remove the entire entity from the range.'
						),
          type: 'unstyled',
          entityRanges: [{offset: 30, length: 13, key: 'third'}],
        },
      ],

      entityMap: {
        first: {
          type: 'TOKEN',
          mutability: 'IMMUTABLE',
        },
        second: {
          type: 'TOKEN',
          mutability: 'MUTABLE',
        },
        third: {
          type: 'TOKEN',
          mutability: 'SEGMENTED',
        },
      },
    };

export default rawContent
