import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TextTranslation = ({ text, style, onPress, ...props }: any) => {
    const { t } = useTranslation()
    return (
        <>
            {props.title == 'elipse' ? <View>
                <Text style={style} onPress={onPress} {...props} numberOfLines={1} ellipsizeMode={'tail'}>{t(text)}</Text>
            </View> : <View>

                <Text style={style} onPress={onPress} {...props}>{t(text)}</Text>
            </View>
            }
        </>
    )
}

export default React.memo(TextTranslation)