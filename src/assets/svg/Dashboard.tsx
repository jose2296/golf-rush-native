import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

function DashboardIcon(props: SvgProps) {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 24 24" {...props}>
            <G fill="none" fillRule="evenodd">
                <Path d="M0 0h24v24H0z" />
                <Path
                    fill="#64728C"
                    fillRule="nonzero"
                    d="M11.5 3a8.5 8.5 0 018.468 9.246 4.382 4.382 0 00-.986-.22 7.5 7.5 0 10-10.9 6.152C8.401 16.686 9.64 16 11.5 16c1.051 0 1.904.22 2.505.679l-.002-.057.004.137c.054.944.398 1.81.946 2.51A8.5 8.5 0 1111.5 3zm7 10a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm-7 4c-1.505 0-2.32.464-2.473 1.581A7.452 7.452 0 0011.5 19c.867 0 1.699-.147 2.473-.417C13.82 17.464 13.005 17 11.5 17zm7-3a2.5 2.5 0 000 5 2.5 2.5 0 000-5zm0 1a.5.5 0 01.492.41l.008.09v1a.5.5 0 01-.992.09L18 16.5v-1a.5.5 0 01.5-.5zm-11 0a.5.5 0 110 1 .5.5 0 010-1zm-2-4a.5.5 0 110 1 .5.5 0 010-1zm12 0a.5.5 0 110 1 .5.5 0 010-1zm-1.646-3.854a.501.501 0 01.057.638l-.057.07-4 4a.501.501 0 01-.765-.638l.057-.07 4-4a.502.502 0 01.708 0zM7.5 7a.5.5 0 110 1 .5.5 0 010-1zm4-2a.5.5 0 110 1 .5.5 0 010-1z"
                />
                <Path
                    fill="#64728C"
                    fillRule="nonzero"
                    d="M11.5 17c-1.505 0-2.32.464-2.473 1.581A7.452 7.452 0 0011.5 19c.867 0 1.699-.147 2.473-.417C13.82 17.464 13.005 17 11.5 17z"
                    opacity={0.3}
                />
            </G>
        </Svg>
    );
}

export default DashboardIcon;
