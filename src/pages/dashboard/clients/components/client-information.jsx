import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import PersonalInformation from '../personal-information'
import PropertyInformation from '../property-information'
import VisaInformation from '../visa-information'
import { useClientBreadcrumb } from '@/hooks/use-client-breadcrumb'
import usePersonalInformationStore from '../personal-information/use-personal-store'
import useFetchWithAbort from '@/hooks/use-fetch-with-abort'

const ClientInformation = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const params = useParams()
  const { getData, data: clientData } = usePersonalInformationStore()
  const [fetchData] = useFetchWithAbort(getData)

  // Use the client breadcrumb hook to manage breadcrumb state
  useClientBreadcrumb(activeTab, clientData)

  // Fetch client data when component mounts
  useEffect(() => {
    if (params.id) {
      fetchData({ id: params.id })
    }
  }, [params.id, fetchData])

  const handleTabChange = (newTab) => {
    setActiveTab(newTab)
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Client Information</h1>
        <p className="text-gray-600 mt-2">Manage and view detailed client information</p>
      </div>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full h-10">
          <TabsTrigger value="personal" className="text-sm font-medium h-full">
            Personal Information
          </TabsTrigger>
          <TabsTrigger value="property" className="text-sm font-medium h-full">
            Property Information
          </TabsTrigger>
          <TabsTrigger value="visa" className="text-sm font-medium h-full">
            Visa Information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-6">
          <PersonalInformation />
        </TabsContent>
        <TabsContent value="property" className="mt-6">
          <PropertyInformation />
        </TabsContent>
        <TabsContent value="visa" className="mt-6">
          <VisaInformation />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ClientInformation