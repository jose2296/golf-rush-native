import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

function EditProfileIcon(props: SvgProps) {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 16 16" {...props}>
            <G fill="none" fillRule="evenodd">
                <Path d="M0 0h16v16H0z" />
                <Path
                    fill="#64728C"
                    fillRule="nonzero"
                    d="M7 1C5.348 1 4 2.348 4 4s1.348 3 3 3 3-1.348 3-3-1.348-3-3-3zm0 6c-2.758 0-5 2.242-5 5h1c0-2.207 1.793-4 4-4 .93 0 1.773.332 2.453.86l.7-.712C9.288 7.445 8.198 7 7 7zm0-5c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2zm6.203 5.004a1.255 1.255 0 00-.89.379l-4.665 4.742-.695 2.922 2.922-.692.098-.101 4.648-4.566a1.266 1.266 0 00.008-1.793l-.524-.528a1.25 1.25 0 00-.902-.363zm.008.992c.066 0 .133.027.187.082l.524.524c.11.105.11.265 0 .375L9.375 13.44l-1.078.262.258-1.078 4.472-4.547a.25.25 0 01.184-.082z"
                />
            </G>
        </Svg>
    );
}

export default EditProfileIcon;
