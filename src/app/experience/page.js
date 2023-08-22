import client from "@/tina";
import Image from "next/image";
import dayjs from "dayjs";
import { Card } from "@/components/card";
import { SimpleLayout } from "@/components/simple-layout";
import { Prose } from "@/components/prose";
import { TinaMarkdown } from "@/components/tina-markdown";

export const metadata = {
  title: "Experience | Justin Sorensen",
  description: "Highlighting my notable gigs in the professional arena.",
};

function Experience({ experience }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="!flex-row md:col-span-3">
        <div className="relative z-10 mr-5 mt-5 h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-teal-500 bg-white">
          {experience.image && (
            <Image
              className="object-cover object-center"
              src={experience.image}
              alt={`${experience.title} - ${experience.description}`}
              fill
            />
          )}
        </div>
        <div>
          <Card.Title>{experience.title}</Card.Title>
          <div className="flex items-center space-x-4">
            <Card.Description className="!mt-0 flex-shrink-0">
              {experience.company}
            </Card.Description>
            {experience.location && (
              <Card.Eyebrow
                className="!order-none !mb-0 !mt-0 !text-zinc-600 dark:!text-zinc-400"
                decorate
              >
                {experience.location}
              </Card.Eyebrow>
            )}
          </div>
          <div className="my-2 flex items-center space-x-4">
            <Card.Eyebrow className="!mb-0">
              {dayjs(experience.startDate).format("MMM YYYY")} -{" "}
              {experience.endDate
                ? dayjs(experience.endDate).format("MMM YYYY")
                : "Present"}
            </Card.Eyebrow>
            {experience.employmentType && (
              <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-0 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                {experience.employmentType}
              </span>
            )}
          </div>
          <Card.Description className="mt-0 flex-shrink-0">
            {experience.description}
          </Card.Description>
          <Prose className="mt-8">
            <TinaMarkdown content={experience.body} />
          </Prose>
        </div>
      </Card>
    </article>
  );
}

export default async function ExperiencePage() {
  const response = await client.queries.experienceConnection({
    // sort: 'employmentLength',
  });
  const experiences = response.data.experienceConnection.edges.map((x) => {
    return { ...x.node };
  });
  //   const totalCount = response.data.experienceConnection.totalCount;
  //   const pageInfo = response.data.experienceConnection.pageInfo;

  experiences.sort(function (a, b) {
    const aEndDate = a.endDate ? dayjs(a.endDate).unix() : Date.now();
    const bEndDate = b.endDate ? dayjs(b.endDate).unix() : Date.now();

    return bEndDate - aEndDate;
  });

  return (
    <SimpleLayout
      title="Highlighting my notable gigs in the professional arena."
      // intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {experiences.map((experience, index) => (
            <Experience key={index} experience={experience} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
