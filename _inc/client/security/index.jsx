/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import FoldableCard from 'components/foldable-card';
import Button from 'components/button';
import Gridicon from 'components/gridicon';
import { translate as __ } from 'i18n-calypso';
import SimpleNotice from 'components/notice';

/**
 * Internal dependencies
 */
import QuerySite from 'components/data/query-site';
import ProStatus from 'pro-status';
import {
	isModuleActivated as _isModuleActivated,
	activateModule,
	deactivateModule,
	isActivatingModule,
	isDeactivatingModule,
	getModule as _getModule
} from 'state/modules';
import { ModuleToggle } from 'components/module-toggle';
import { AllModuleSettings } from 'components/module-settings/modules-per-tab-page';
import { isUnavailableInDevMode } from 'state/connection';

export const Page = ( props ) => {
	let {
		toggleModule,
		isModuleActivated,
		isTogglingModule,
		getModule
		} = props;
	var cards = [
		[ 'scan', __( 'Security Scanning' ), __( 'Automatically scan your site for common threats and attacks.' ) ],
		[ 'protect', getModule( 'protect' ).name, getModule( 'protect' ).description, getModule( 'protect' ).learn_more_button ],
		[ 'monitor', getModule( 'monitor' ).name, getModule( 'monitor' ).description, getModule( 'monitor' ).learn_more_button ],
		[ 'akismet', 'Akismet', __( 'Keep those spammers away!' ), 'https://akismet.com/jetpack/' ],
		[ 'backups', __( 'Site Backups' ), __( 'Keep your site backed up!' ), 'https://vaultpress.com/jetpack/' ],
		[ 'sso', getModule( 'sso' ).name, getModule( 'sso' ).description, getModule( 'sso' ).learn_more_button ]
	].map( ( element ) => {
		var unavailableInDevMode = props.isUnavailableInDevMode( element[0] ),
			toggle = (
				unavailableInDevMode ? __( 'Unavailable in Dev Mode' ) :
				<ModuleToggle slug={ element[0] } activated={ isModuleActivated( element[0] ) }
					toggling={ isTogglingModule( element[0] ) }
					toggleModule={ toggleModule } />
			),
			customClasses = unavailableInDevMode ? 'devmode-disabled' : '',
			isPro = 'scan' === element[0] || 'akismet' === element[0] || 'backups' === element[0],
			proProps = {};

		if ( isPro ) {
			// Add a "pro" button next to the header title
			element[1] = <span>
				{ element[1] }
				<Button
					compact={ true }
					href="#professional"
				>
					{ __( 'Pro' ) }
				</Button>
			</span>;

			toggle = <ProStatus proFeature={ element[0] } />;
		}

		return (
			<FoldableCard
				className={ customClasses }
				key={ `module-card_${element[0]}` /* https://fb.me/react-warning-keys */ }
				header={ element[1] }
				subheader={ element[2] }
				summary={ toggle }
				expandedSummary={ toggle }
				clickableHeaderText={ true } >
				{
					isModuleActivated( element[0] ) || isPro ?
						<AllModuleSettings module={ isPro ? proProps : getModule( element[ 0 ] ) } /> :
						// Render the long_description if module is deactivated
						<div dangerouslySetInnerHTML={ renderLongDescription( getModule( element[0] ) ) } />
				}
				<div className="jp-module-settings__read-more">
					<Button borderless compact href={ element[3] }><Gridicon icon="help-outline" /><span className="screen-reader-text">{ __( 'Learn More' ) }</span></Button>
				</div>
			</FoldableCard>
		);
	} );

	return (
		<div>
			<QuerySite />
			{ cards }
		</div>
	);
};

function renderLongDescription( module ) {
	// Rationale behind returning an object and not just the string
	// https://facebook.github.io/react/tips/dangerously-set-inner-html.html
	return { __html: module.long_description };
}

export default connect(
	( state ) => {
		return {
			isModuleActivated: ( module_name ) => _isModuleActivated( state, module_name ),
			isTogglingModule: ( module_name ) =>
				isActivatingModule( state, module_name ) || isDeactivatingModule( state, module_name ),
			getModule: ( module_name ) => _getModule( state, module_name ),
			isUnavailableInDevMode: ( module_name ) => isUnavailableInDevMode( state, module_name )
		};
	},
	( dispatch ) => {
		return {
			toggleModule: ( module_name, activated ) => {
				return ( activated )
					? dispatch( deactivateModule( module_name ) )
					: dispatch( activateModule( module_name ) );
			}
		};
	}
)( Page );
