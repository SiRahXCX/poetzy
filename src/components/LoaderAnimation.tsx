import { ActivityIndicator } from 'react-native'

type LoaderAnimationProps = {
    size?: 'small' | 'medium' | 'large';
}

export default function LoaderAnimation({ size='medium' } : LoaderAnimationProps) {
    let indicatorSize: number
    if (size === 'small') {
        indicatorSize = 20
    } else if (size === 'medium') {
        indicatorSize = 28
    } else {
        indicatorSize = 36
    }

    return (
        <ActivityIndicator color='blue' size={indicatorSize} />
    )
}