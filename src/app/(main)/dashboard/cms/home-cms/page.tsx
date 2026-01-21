'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { mediaUrl } from '@/api/endpoints/endpoints';
import { useGetHomeCms, useUpdateHomeCms } from '@/api/hooks/home-cms/hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function HomeCmsPage() {
  const { data, isLoading } = useGetHomeCms();
  const updateMutation = useUpdateHomeCms();

  const [bannerData, setBannerData] = useState({
    overlayText: '',
    headerI: '',
    headerII: '',
    subHeaderI: '',
    subHeaderII: '',
    buttonText: '',
  });
  const [sectionI, setSectionI] = useState({ header: '', items: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }] });
  const [sectionII, setSectionII] = useState({ header: '', description: '' });
  const [sectionIII, setSectionIII] = useState({ header: '', items: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }] });
  const [sectionIV, setSectionIV] = useState({ header: '', items: [{ name: '', designation: '', review: '' }, { name: '', designation: '', review: '' }, { name: '', designation: '', review: '' }] });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  useEffect(() => {
    if (data?.data) {
      if (data.data.banner_section) {
        setBannerData({
          overlayText: data.data.banner_section.overlay_text || '',
          headerI: data.data.banner_section.header_i || '',
          headerII: data.data.banner_section.header_ii || '',
          subHeaderI: data.data.banner_section.sub_header_i || '',
          subHeaderII: data.data.banner_section.sub_header_ii || '',
          buttonText: data.data.banner_section.button_text || '',
        });
      }
      if (data.data.section_i) {
        setSectionI({ header: data.data.section_i.header || '', items: data.data.section_i.items || [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }] });
      }
      if (data.data.section_ii) {
        setSectionII({ header: data.data.section_ii.header || '', description: data.data.section_ii.description || '' });
      }
      if (data.data.section_iii) {
        setSectionIII({ header: data.data.section_iii.header || '', items: data.data.section_iii.items || [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }] });
      }
      if (data.data.section_iv) {
        setSectionIV({ header: data.data.section_iv.header || '', items: data.data.section_iv.items || [{ name: '', designation: '', review: '' }, { name: '', designation: '', review: '' }, { name: '', designation: '', review: '' }] });
      }
    }
  }, [data]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('banner_section', JSON.stringify(bannerData));
    formData.append('section_i', JSON.stringify(sectionI));
    formData.append('section_ii', JSON.stringify(sectionII));
    formData.append('section_iii', JSON.stringify(sectionIII));
    formData.append('section_iv', JSON.stringify(sectionIV));
    
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });
    
    try {
      await updateMutation.mutateAsync(formData);
      toast.success('Home CMS updated successfully');
    } catch (error) {
      toast.error('Failed to update Home CMS');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Home CMS</h1>

      <Tabs defaultValue="banner" className="space-y-4">
        <TabsList>
          <TabsTrigger value="banner">Banner</TabsTrigger>
          <TabsTrigger value="section1">Services</TabsTrigger>
          <TabsTrigger value="section2">About Us</TabsTrigger>
          <TabsTrigger value="section3">Features</TabsTrigger>
          <TabsTrigger value="section4">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="banner">
          <Card>
            <CardHeader><CardTitle>Banner Section</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Background Image</Label>
                <Input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, banner_background: e.target.files?.[0] || null })} />
                {data?.data?.banner_section?.background_image && (
                  <Image src={mediaUrl(data.data.banner_section.background_image, 'home-cms')} alt="Banner" width={200} height={100} className="rounded" />
                )}
              </div>
              <div className="space-y-2">
                <Label>Overlay Text</Label>
                <Input value={bannerData.overlayText} onChange={(e) => setBannerData({ ...bannerData, overlayText: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Header I</Label>
                  <Input value={bannerData.headerI} onChange={(e) => setBannerData({ ...bannerData, headerI: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Header II</Label>
                  <Input value={bannerData.headerII} onChange={(e) => setBannerData({ ...bannerData, headerII: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sub Header I</Label>
                  <Input value={bannerData.subHeaderI} onChange={(e) => setBannerData({ ...bannerData, subHeaderI: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Sub Header II</Label>
                  <Input value={bannerData.subHeaderII} onChange={(e) => setBannerData({ ...bannerData, subHeaderII: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input value={bannerData.buttonText} onChange={(e) => setBannerData({ ...bannerData, buttonText: e.target.value })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section1">
          <Card>
            <CardHeader><CardTitle>Section I - Services</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Header</Label>
                <Input value={sectionI.header} onChange={(e) => setSectionI({ ...sectionI, header: e.target.value })} />
              </div>
              {sectionI.items.map((item, idx) => (
                <Card key={idx} className="p-4">
                  <h3 className="font-semibold mb-4">Service {idx + 1}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, [`section_i_icon_${idx}`]: e.target.files?.[0] || null })} />
                      {data?.data?.section_i?.items?.[idx]?.icon && (
                        <Image src={mediaUrl(data.data.section_i.items[idx].icon, 'home-cms')} alt="Icon" width={50} height={50} className="rounded" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={item.title} onChange={(e) => {
                        const newItems = [...sectionI.items];
                        newItems[idx].title = e.target.value;
                        setSectionI({ ...sectionI, items: newItems });
                      }} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={item.description} onChange={(e) => {
                        const newItems = [...sectionI.items];
                        newItems[idx].description = e.target.value;
                        setSectionI({ ...sectionI, items: newItems });
                      }} />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section2">
          <Card>
            <CardHeader><CardTitle>Section II - About Us</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, section_ii_image: e.target.files?.[0] || null })} />
                {data?.data?.section_ii?.image && (
                  <Image src={mediaUrl(data.data.section_ii.image, 'home-cms')} alt="About" width={200} height={150} className="rounded" />
                )}
              </div>
              <div className="space-y-2">
                <Label>Header</Label>
                <Input value={sectionII.header} onChange={(e) => setSectionII({ ...sectionII, header: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={5} value={sectionII.description} onChange={(e) => setSectionII({ ...sectionII, description: e.target.value })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section3">
          <Card>
            <CardHeader><CardTitle>Section III - Features</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Header</Label>
                <Input value={sectionIII.header} onChange={(e) => setSectionIII({ ...sectionIII, header: e.target.value })} />
              </div>
              {sectionIII.items.map((item, idx) => (
                <Card key={idx} className="p-4">
                  <h3 className="font-semibold mb-4">Feature {idx + 1}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, [`section_iii_icon_${idx}`]: e.target.files?.[0] || null })} />
                      {data?.data?.section_iii?.items?.[idx]?.icon && (
                        <Image src={mediaUrl(data.data.section_iii.items[idx].icon, 'home-cms')} alt="Icon" width={50} height={50} className="rounded" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={item.title} onChange={(e) => {
                        const newItems = [...sectionIII.items];
                        newItems[idx].title = e.target.value;
                        setSectionIII({ ...sectionIII, items: newItems });
                      }} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={item.description} onChange={(e) => {
                        const newItems = [...sectionIII.items];
                        newItems[idx].description = e.target.value;
                        setSectionIII({ ...sectionIII, items: newItems });
                      }} />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section4">
          <Card>
            <CardHeader><CardTitle>Section IV - Testimonials</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Header</Label>
                <Input value={sectionIV.header} onChange={(e) => setSectionIV({ ...sectionIV, header: e.target.value })} />
              </div>
              {sectionIV.items.map((item, idx) => (
                <Card key={idx} className="p-4">
                  <h3 className="font-semibold mb-4">Testimonial {idx + 1}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Image</Label>
                      <Input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, [`section_iv_image_${idx}`]: e.target.files?.[0] || null })} />
                      {data?.data?.section_iv?.items?.[idx]?.image && (
                        <Image src={mediaUrl(data.data.section_iv.items[idx].image, 'home-cms')} alt="Testimonial" width={80} height={80} className="rounded-full" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value={item.name} onChange={(e) => {
                        const newItems = [...sectionIV.items];
                        newItems[idx].name = e.target.value;
                        setSectionIV({ ...sectionIV, items: newItems });
                      }} />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input value={item.designation} onChange={(e) => {
                        const newItems = [...sectionIV.items];
                        newItems[idx].designation = e.target.value;
                        setSectionIV({ ...sectionIV, items: newItems });
                      }} />
                    </div>
                    <div className="space-y-2">
                      <Label>Review</Label>
                      <Textarea value={item.review} onChange={(e) => {
                        const newItems = [...sectionIV.items];
                        newItems[idx].review = e.target.value;
                        setSectionIV({ ...sectionIV, items: newItems });
                      }} />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
