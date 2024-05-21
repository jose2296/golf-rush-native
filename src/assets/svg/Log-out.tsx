import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

function LogOutIcon(props: SvgProps) {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 16 16" {...props}>
            <G fill="none" fillRule="evenodd">
                <Path d="M0 0h16v16H0z" />
                <Path
                    fill="#64728C"
                    fillRule="nonzero"
                    d="M2.5 2C1.676 2 1 2.676 1 3.5v10c0 .824.676 1.5 1.5 1.5h10c.824 0 1.5-.676 1.5-1.5V11l-1 1v1.5c0 .281-.219.5-.5.5h-10a.494.494 0 01-.5-.5v-10c0-.281.219-.5.5-.5h10c.281 0 .5.219.5.5V5l1 1V3.5c0-.824-.676-1.5-1.5-1.5h-10zm8.23 3.023l-.71.704L12.293 8H5v1h7.293l-2.273 2.27.71.71 3.477-3.48-3.477-3.477z"
                />
            </G>
        </Svg>
    );
}

export default LogOutIcon;
