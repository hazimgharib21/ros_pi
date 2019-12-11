#!/usr/bin/env python

import rospy
import psutil
from std_msgs.msg import Float32

class pi_core:

    def __init__(self):
        
        self.rate = rospy.Rate(1)

        self.cpu_temp_pub_ = rospy.Publisher("pi/core/cpu_temp", Float32, queue_size=1)

    def update(self):

        while not rospy.is_shutdown():

            self.publish_cpu_temp()

            self.rate.sleep()

    def publish_cpu_temp(self):

        try:
            output = float(psutil.sensors_temperatures()['cpu-thermal'][0].current)
        except:
            output = 0.0

        self.cpu_temp_pub_.publish(output)

if __name__ == '__main__':
    rospy.init_node('pi_core', anonymous=True)
    rospy.loginfo('pi_core started...')
    system_stat = pi_core()
    system_stat.update()
    rospy.spin()
