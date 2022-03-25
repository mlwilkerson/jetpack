/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { H2, H3, Title, TIPOGRAPHY_WEIGHTS, TIPOGRAPHY_SIZES } from '../index.jsx';
import styles from './style.module.scss';

export default {
	title: 'Packages/My Jetpack/Heading',
	component: H2,
	argTypes: {
		children: {
			control: { type: 'text' },
		},
		weight: {
			control: { type: 'select', options: Object.values( TIPOGRAPHY_WEIGHTS ) },
		},
		size: {
			control: { type: 'select', options: Object.values( TIPOGRAPHY_SIZES ) },
		},
	},
};

/**
 * Helper component to create a the story.
 *
 * @param {object} props                   - Component props.
 * @param {React.Component} props.children - Icon component children.
 * @returns {React.Component}                Text component instance.
 */
function Instance( { children } ) {
	return (
		<div className={ styles.instance }>
			<span>Text above to the the component...</span>
			{ children }
			<span>Text below to the the component...</span>
		</div>
	);
}

const TemplateH2 = args => (
	<Instance>
		<H2 { ...args }>
			{ args?.children ||
				'Headline Medium - Manage your Jetpack plan and products all in one place' }
		</H2>
	</Instance>
);

const TemplateH3 = args => (
	<Instance>
		<H3 { ...args }>
			{ args?.children ||
				'Headline Small - Manage your Jetpack plan and products all in one place' }
		</H3>
	</Instance>
);

const TemplateTitle = args => (
	<Instance>
		<Title { ...args }>
			{ args?.children || 'Title Medium - Secure, grow, and increase your site speed' }
		</Title>
	</Instance>
);

const Template = args => {
	return (
		<>
			<TemplateH2 { ...args } />
			<TemplateH3 { ...args } />
			<TemplateTitle { ...args } />
		</>
	);
};

const DefaultArgs = {};
export const Default = Template.bind( {} );
Default.args = DefaultArgs;

export const HeadlineMedium = TemplateH2.bind( {} );
HeadlineMedium.storyName = 'H2';

export const HeadlineSmall = TemplateH3.bind( {} );
HeadlineSmall.storyName = 'H3';

export const TitleInstance = TemplateTitle.bind( {} );
TitleInstance.storyName = 'Title';
