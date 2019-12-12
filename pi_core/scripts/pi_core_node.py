#!/usr/bin/env python

import rospy
import psutil
from std_msgs.msg import Float32, Int8
from pi_core.srv import Network_Adapters, Network_AdaptersResponse

'''
TO-DO

Topic:
    CPU Freq
    Mem Usage

Service:
    Boot Time
    Up Time
    Disk Usage

'''

class pi_core:

    def __init__(self):
        
        self.rate = rospy.Rate(1)

        self.cpu_temp_pub_ = rospy.Publisher("pi/core/cpu_temp", Float32, queue_size=1)
        self.cpu_usage_pub_ = rospy.Publisher("pi/core/cpu_usage", Int8, queue_size=1)
        self.network_adapters = rospy.Service('network_adapters', Network_Adapters, self.handle_network_adapters)

    def update(self):

        while not rospy.is_shutdown():

            self.publish_cpu_temp()
            self.publish_cpu_usage()

            self.rate.sleep()

    def handle_network_adapters(self, req):
        interfaces = []
        addresses = []
        ifaces = psutil.net_if_addrs()
        for k, v in ifaces.items():
            interfaces.append(k)
            addresses.append(v[0].address)
        resp = Network_AdaptersResponse()
        resp.interfaces = interfaces
        resp.addresses = addresses
        return resp

    def publish_cpu_temp(self):

        try:
            output = float(psutil.sensors_temperatures()['cpu-thermal'][0].current)
        except:
            output = 0.0

        self.cpu_temp_pub_.publish(output)

    def publish_cpu_usage(self):

        try:
            output = int(psutil.cpu_percent(interval=None, percpu=False))
        except:
            output = 0

        self.cpu_usage_pub_.publish(output)

if __name__ == '__main__':
    rospy.init_node('pi_core')
    rospy.loginfo('pi_core started...')
    system_stat = pi_core()
    system_stat.update()
    rospy.spin()
