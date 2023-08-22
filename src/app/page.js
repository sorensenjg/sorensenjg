import client from "@/tina";

import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import { sendEmail } from "@/lib/email";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import {
  MailIcon,
  BriefcaseIcon,
  ArrowDownIcon,
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/icons";
import logoDystrick from "@/images/logos/dystrick.png";
import logoSorensenjg from "@/images/avatar.jpg";
import logoMarmtGroup from "@/images/logos/marmt-group.jpeg";
import logoCustomPad from "@/images/logos/custom-pad.jpg";

function Post({ post }) {
  return (
    <Card as="article">
      <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={post.date} decorate>
        {formatDate(post.date)}
      </Card.Eyebrow>
      <Card.Description>{post.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link
      className="group -m-1 p-1"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

function Newsletter() {
  return (
    <form
      action={async function (formData) {
        "use server";
        const ok = await sendEmail(formData, "newsletter-signup");

        if (ok) {
          redirect("/thank-you");
        }
      }}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  );
}

function Resume() {
  let resume = [
    {
      company: "dystrick design",
      title: "Senior Full Stack Web Developer",
      logo: logoDystrick,
      start: "2015",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: "sorensenjg",
      title: "Freelance Full Stack Web Developer",
      logo: logoSorensenjg,
      start: "2010",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: "Marmt Group LLC",
      title: "Co-Founder & Senior Software Developer",
      logo: logoMarmtGroup,
      start: "2018",
      end: "2020",
    },
    {
      company: "Custom Pad & Partition, Inc.",
      title: "Graphic Designer & Large Format Printing",
      logo: logoCustomPad,
      start: "2011",
      end: "2015",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {role.logo && (
                <div className="relative flex h-7 w-7 overflow-hidden rounded-full">
                  <Image
                    src={role.logo}
                    alt={role.company}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    unoptimized
                  />
                </div>
              )}
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

async function Photos() {
  const data = await fetch(`https://picsum.photos/v2/list?page=3&limit=5`).then(
    (response) => response.json()
  );

  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {data.map((image, imageIndex) => (
          <div
            key={image.url}
            className={classNames(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image.download_url}
              alt=""
              // width={image.width}
              // height={image.height}
              fill
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

async function Posts() {
  const postsResponse = await client.queries.postConnection();
  const posts = postsResponse.data.postConnection.edges.map((x) => {
    return { ...x.node, slug: x.node._sys.filename };
  });

  return (
    <>
      {posts.map((post) => (
        <Post key={post.slug} post={post} />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Web developer, outdoor enthusiast, and trout bum.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Justin, a web developer who lives and works in the Silicon
            Valley. I’m passionate about forging web experiences, leveraging
            cutting edge technologies, exceptional design, instinctive user
            journeys, and peak performance. When I’m not working you can find me
            in the Sierra Nevada mountains... camping, fishing, and off-roading
            with my family and friends.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/sorensenjg"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://twitter.com/sorensenjg"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/sorensenjg"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://instagram.com/sorensenjg"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <Posts />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
