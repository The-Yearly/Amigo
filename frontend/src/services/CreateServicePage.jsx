import { useContext, useEffect, useState } from "react";
import ExploreNavBar from "@/Components/Landing/Navbar";
import ExploreFooter from "@/Components/Landing/Footer";
import ListingTipsPanel from "@/Components/Services/ListingTipsPanel";
import ServicePreviewCard from "@/Components/Services/ServicePreviewCard";
import ImageUpload from "@/Components/Services/ImageUpload";
import FormField from "@/Components/Services/FormField";
import { upload } from "@imagekit/react";
import axios from "axios";
import { AuthContext } from "@/lib/authProvider";
import { ToastContainer, toast } from "react-toastify";

const CATEGORIES = [
  "Photography",
  "Tutoring",
  "Tech Support",
  "Graphic Design",
  "Moving Help",
  "Other",
];

export default function CreateServicePage() {
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    price: "",
    location: "",
    description: "",
    image: "",
  });
  const abortController = new AbortController();
  const [imagePreview, setImagePreview] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("Draft")) {
      setForm(JSON.parse(localStorage.getItem("Draft")));
    }
  }, []);
  const saveDraft = () => {
    localStorage.setItem("Draft", JSON.stringify(form));
  };
  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  const handleUpload = async () => {
    if (!image) {
      toast.warn("Select image first");
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/uploadImage`,
      );

      const response = await upload({
        file: image,
        fileName: image.name,
        publicKey: data.publicKey,
        signature: data.signature,
        token: data.token,
        expire: data.expire,
      });

      return response.url;
    } catch (err) {
      console.log(err);
    }
  };

  function handleImageChange(file) {
    setImage(file);
    const url = URL.createObjectURL(file);

    setImagePreview(url);

    // TEMP: store preview URL (later → cloud upload)
    setForm((prev) => ({
      ...prev,
      image: url,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.price) {
      toast.warn("Title and price required");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await handleUpload();

      const updatedForm = {
        ...form,
        image: imageUrl,
        id: user.uid,
      };

      console.log(updatedForm);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/services`, updatedForm, {
        withCredentials: true,
      });

      toast.success("Service created!");
      setForm({
        title: "",
        category: CATEGORIES[0],
        price: "",
        location: "",
        description: "",
        image: "",
      });
      setImagePreview("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create service");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-surface font-body text-on-surface antialiased">
      
      <ToastContainer />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold font-display tracking-tight text-primary mb-4">
            New Service Listing
          </h1>
          <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
            Design your offering with care. Our marketplace thrives on the
            talent and unique perspectives of our campus curators.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Col 1–3: Tips sidebar */}
          <ListingTipsPanel />

          {/* Col 4–9: Form */}
          <section className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-surface-container-lowest p-10 rounded-lg shadow-md hover:shadow-lg border border-outline-variant/10 transition-shadow">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Image upload */}
                <ImageUpload
                  preview={imagePreview}
                  onChange={handleImageChange}
                />

                {/* Basic info */}
                <div className="space-y-6">
                  <FormField
                    label="Service Title"
                    placeholder="e.g., Professional Editorial Photography"
                    value={form.title}
                    onChange={set("title")}
                  />

                  {/* Category + Price row */}
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      label="Category"
                      as="select"
                      options={CATEGORIES}
                      value={form.category}
                      onChange={set("category")}
                    />
                    <FormField
                      label="Price ($)"
                      type="number"
                      placeholder="0.00"
                      value={form.price}
                      onChange={set("price")}
                    />
                  </div>

                  <FormField
                    label="Location"
                    icon="location_on"
                    placeholder="Main Campus, Library, or Remote"
                    value={form.location}
                    onChange={set("location")}
                  />

                  <FormField
                    label="Detailed Description"
                    as="textarea"
                    rows={6}
                    placeholder="Describe your service in detail..."
                    value={form.description}
                    onChange={set("description")}
                  />
                </div>

                {/* Action bar */}
                <div className="pt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="bg-secondary-container text-on-secondary-container px-5 py-3 rounded-lg font-bold shadow-sm border border-secondary-container/20 hover:shadow-md transition-all"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    disabled={Loading}
                    className="bg-primary-gradient text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {Loading ? "Publishing..." : "Publish Service"}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Col 10–12: Live preview */}
          <ServicePreviewCard
            title={form.title}
            price={form.price}
            imageSrc={imagePreview}
          />
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
