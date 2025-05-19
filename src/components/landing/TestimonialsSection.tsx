
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";

const testimonials = [
  {
    quote: "Since implementing HealthProvide, our no-show rate decreased by 32% and patient satisfaction scores have increased by 28%. The AI scheduling tool has been a game-changer.",
    name: "Dr. Sarah Johnson",
    title: "Medical Director",
    practice: "Bergen Family Medicine, NJ"
  },
  {
    quote: "The billing integration has revolutionized our revenue cycle. We've reduced claim denials by 45% and shortened our reimbursement time by half. Worth every penny.",
    name: "Michael Chen",
    title: "Practice Manager",
    practice: "Philadelphia Primary Care"
  },
  {
    quote: "Our patients love the self-scheduling system, and my staff appreciates the automated reminders and intuitive interface. Training time was minimal, and support is always responsive.",
    name: "Dr. Emily Rodriguez",
    title: "Owner",
    practice: "Hudson Valley Pediatrics, NY"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-healthcare-primary font-semibold uppercase tracking-wider">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-healthcare-dark">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of healthcare practices already transforming their operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-healthcare-primary opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Avatar>
                      <User size={24} />
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-semibold text-healthcare-dark">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.title}, {testimonial.practice}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
