import { useState } from "react";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form); // later connect backend
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
                <p className="text-gray-400 mt-2">
                    Have questions or feedback? We'd love to hear from you.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold">Email</h3>
                        <p className="text-gray-400">support@blogmag.com</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Location</h3>
                        <p className="text-gray-400">Himachal Pradesh, India</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Working Hours</h3>
                        <p className="text-gray-400">Mon - Fri: 9AM - 6PM</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-6 rounded-xl space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-900 outline-none"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-900 outline-none"
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-900 outline-none min-h-[120px]"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-md"
                    >
                        Send Message
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Contact;