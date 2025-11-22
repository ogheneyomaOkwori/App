import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex flex-1 flex-col gap-5 justify-center items-center'>
        <Image
          source={icons.person}
          className='w-32 h-32 rounded-full'
        />
        <Text className='text-white text-2xl font-bold'>User Name</Text>
        <Text className='text-light-300 text-base font-medium text-center'>Sign up to view and update profile</Text>
      </View>
    </View>
  )
}

export default profile