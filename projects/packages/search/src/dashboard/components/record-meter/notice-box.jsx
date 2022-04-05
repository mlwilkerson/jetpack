/**
 * External dependencies
 */
import React, { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import SimpleNotice from 'components/notice';
import NoticeAction from 'components/notice/notice-action.jsx';

const CLOSE_TO_LIMIT_PERCENT = 0.8; //TODO: currently 'close' is defined as 80%. This has not been decided/finalised to be the best number here yet

/**
 * Returns a notice box for displaying notices about record count and plan limits
 *
 * @param {object} props - Props
 * @param {number} props.recordCount - Current count of user's total records
 * @param {number} props.recordLimit - Max number of records allowed in user's current tier
 * @param {boolean} props.hasBeenIndexed - True if site has a last indexed date
 * @param {boolean} props.hasValidData - True if data is present and in valid form
 * @param {boolean} props.hasItems - True if there is at least one indexed record
 * @returns {React.Component} notice box component.
 */
export function NoticeBox( props ) {
	const notices = [];
	const [ showNotice, setShowNotice ] = useState( true );
	const dismissNoticeBox = () => {
		setShowNotice( false );
	};

	// check data is valid
	if ( props.hasValidData === false ) {
		notices.push( {
			message: __(
				"We weren't able to properly locate your content for Search",
				'jetpack-search-pkg'
			),
			isImportant: true,
		} );
	}

	// check site has been indexed
	if ( props.hasBeenIndexed === false ) {
		notices.push( {
			message: __( 'Your content has not yet been indexed for Search', 'jetpack-search-pkg' ),
		} );
	}

	// check at least one indexable item
	if ( props.hasItems === false ) {
		notices.push( {
			message: __(
				"We weren't able to locate any content for Search to index. Perhaps you don't yet have any posts or pages?",
				'jetpack-search-pkg'
			),
		} );
	}

	if ( props.recordCount > props.planRecordLimit ) {
		notices.push( {
			message: sprintf(
				// translators: %d: site's current plan record limit
				__(
					'You recently surpassed %d records and will be automatically upgraded to the next billing tier', //TODO: add a link to the tier pricing/upgrade info page
					'jetpack-search-pkg'
				),
				props.planRecordLimit
			),
		} );
	}

	if (
		props.recordCount > props.planRecordLimit * CLOSE_TO_LIMIT_PERCENT &&
		props.recordCount < props.planRecordLimit
	) {
		notices.push( {
			message: sprintf(
				// translators: %d: site's current plan record limit
				__(
					"You're close to the max amount of records for this billing tier. Once you hit %d indexed records, you'll automatically be billed for the next tier",
					'jetpack-search-pkg'
				),
				props.planRecordLimit
			),
		} );
	}

	if ( ! notices || notices.length < 1 || ! showNotice ) {
		return null;
	}

	const noticeBoxClassName = notices[ 0 ].isImportant
		? 'jp-search-notice-box jp-search-notice-box__important'
		: 'jp-search-notice-box';

	return (
		<SimpleNotice
			isCompact={ false }
			status={ 'is-info' }
			className={ noticeBoxClassName }
			onDismissClick={ dismissNoticeBox }
		>
			{ notices[ 0 ].message }
			{ notices[ 0 ].link && (
				<NoticeAction href={ 'google.com' } external={ false }>
					{ __( 'I am a link', 'jetpack-search-pkg' ) }
				</NoticeAction>
			) }
		</SimpleNotice>
	);
}

export default NoticeBox;
