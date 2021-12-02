/**
 * External dependencies
 */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import analytics from '@automattic/jetpack-analytics';
import restApi from '@automattic/jetpack-api';
import { JetpackLogo } from '@automattic/jetpack-components';

/**
 * Internal dependencies
 */
import ScreenMain from './screen-main';
import ScreenMigrated from './screen-migrated';
import trackAndBumpMCStats from '../../tools/tracking';
import './style.scss';

/**
 * The IDC screen component.
 *
 * @param {object} props - The properties.
 * @returns {React.Component} The `ConnectScreen` component.
 */
const IDCScreen = props => {
	const {
		logo,
		headerText,
		wpcomHomeUrl,
		currentUrl,
		apiNonce,
		apiRoot,
		redirectUri,
		tracksUserData,
		tracksEventData,
	} = props;

	const [ isMigrated, setIsMigrated ] = useState( false );

	const onMigrated = useCallback( () => {
		setIsMigrated( true );
	}, [ setIsMigrated ] );

	/**
	 * Initialize the REST API and analytics.
	 */
	useEffect( () => {
		restApi.setApiRoot( apiRoot );
		restApi.setApiNonce( apiNonce );

		if (
			tracksUserData &&
			tracksUserData.hasOwnProperty( 'userid' ) &&
			tracksUserData.hasOwnProperty( 'username' )
		) {
			analytics.initialize( tracksUserData.userid, tracksUserData.username );
		}

		if ( tracksEventData ) {
			if ( tracksEventData.hasOwnProperty( 'isAdmin' ) && tracksEventData.isAdmin ) {
				trackAndBumpMCStats( 'notice_view' );
			} else {
				trackAndBumpMCStats( 'non_admin_notice_view', {
					page: tracksEventData.hasOwnProperty( 'currentScreen' )
						? tracksEventData.currentScreen
						: false,
				} );
			}
		}
	}, [ apiRoot, apiNonce, tracksUserData, tracksEventData ] );

	return (
		<div className={ 'jp-idc__idc-screen' + ( isMigrated ? ' jp-idc__idc-screen__success' : '' ) }>
			<div className="jp-idc__idc-screen__header">
				<div className="jp-idc__idc-screen__logo">{ logo }</div>
				<div className="jp-idc__idc-screen__logo-label">{ headerText }</div>
			</div>

			{ isMigrated ? (
				<ScreenMigrated wpcomHomeUrl={ wpcomHomeUrl } currentUrl={ currentUrl } />
			) : (
				<ScreenMain
					wpcomHomeUrl={ wpcomHomeUrl }
					currentUrl={ currentUrl }
					onMigrated={ onMigrated }
					redirectUri={ redirectUri }
				/>
			) }
		</div>
	);
};

IDCScreen.propTypes = {
	/** The screen logo. */
	logo: PropTypes.object.isRequired,
	/** The header text. */
	headerText: PropTypes.string.isRequired,
	/** The original site URL. */
	wpcomHomeUrl: PropTypes.string.isRequired,
	/** The current site URL. */
	currentUrl: PropTypes.string.isRequired,
	/** The redirect URI to redirect users back to after connecting. */
	redirectUri: PropTypes.string.isRequired,
	/** API root URL. */
	apiRoot: PropTypes.string.isRequired,
	/** API Nonce. */
	apiNonce: PropTypes.string.isRequired,
	/** WordPress.com user's Tracks identity. */
	tracksUserData: PropTypes.object,
	/** WordPress.com event tracking information. */
	tracksEventData: PropTypes.object,
};

IDCScreen.defaultProps = {
	logo: <JetpackLogo height={ 24 } />,
	headerText: __( 'Safe Mode', 'jetpack' ),
};

export default IDCScreen;
