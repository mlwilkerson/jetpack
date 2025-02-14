/**
 * External dependencies
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, close } from '@wordpress/icons';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import styles from './styles.module.scss';

const CloseLink = ( { className } ) => {
	return (
		<Link to="/" className={ classNames( styles.link, className ) }>
			<Icon icon={ close } className={ styles.icon } />
		</Link>
	);
};

export default CloseLink;
