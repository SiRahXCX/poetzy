import { ActivityIndicator } from 'react-native'

type LoaderAnimationProps = {
    color?: string;
    size?: 'small' | 'medium' | 'large';
}

export default function LoaderAnimation({ color = 'blue', size = 'medium' } : LoaderAnimationProps) {
    let indicatorSize: number
    switch (size) {
        case 'small':
            indicatorSize = 20
            break
        case 'medium':
            indicatorSize = 28
            break
        default:
            indicatorSize = 36
    }

    return (
        <ActivityIndicator color={color} size={indicatorSize} />
    )
}