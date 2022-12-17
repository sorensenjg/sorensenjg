import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Spencer Sharp</title>
        <meta
          name="description"
          content="All the things that help me to be comfortable and productive."
        />
      </Head>
      <SimpleLayout
        title="All the things that help me to be comfortable and productive."
        // intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="16” MacBook Pro, M1 Pro, 16GB RAM (2021)">
              This things is crazy fast, and I&rsquo;ve never once heard the
              fan.
              {/* I was using an Intel-based 16” MacBook Pro prior to this and the
              difference is night and day. I’ve never heard the fans turn on a
              single time, even under the incredibly heavy loads I put it
              through with our various launch simulations. */}
            </Tool>
            <Tool title='38" LG UltraWide Monitor (38WN95C-W)'>
              IPS 3840x1600 resolution, 144Hz refresh rate, 1ms response time,
              Thunderbolt 3
              {/* The only display on the market if you want something HiDPI and
              bigger than 27”. When you’re working at planetary scale, every
              pixel you can get counts. */}
            </Tool>
            <Tool title="Ergotron HX Desk Monitor Arm">
              {/* The only display on the market if you want something HiDPI and
              bigger than 27”. When you’re working at planetary scale, every
              pixel you can get counts. */}
            </Tool>
            <Tool title="NovelKeys NK65 Keyboard">
              {/* They don’t make keyboards the way they used to. I buy these any
              time I see them go up for sale and keep them in storage in case I
              need parts or need to retire my main. */}
            </Tool>
            <Tool title="Apple Magic Mouse">
              {/* Something about all the gestures makes me feel like a wizard with
              special powers. I really like feeling like a wizard with special
              powers. */}
            </Tool>
            <Tool title="CalDigit TS4 Thunderbolt 4 Dock"></Tool>
            <Tool title="Allsteel Chair">
              {/* If I’m going to slouch in the worst ergonomic position imaginable
              all day, I might as well do it in an expensive chair. */}
            </Tool>
            <Tool title="Cheap Target Desk">
              {/* If I’m going to slouch in the worst ergonomic position imaginable
              all day, I might as well do it in an expensive chair. */}
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="VS Code">
              Editor
              {/* I don’t care if it’s missing all of the fancy IDE features
              everyone else relies on, Sublime Text is still the best text
              editor ever made. */}
            </Tool>
            <Tool title="Tower Git">Version control GUI</Tool>
            <Tool title="Transmit FTP">File transfer protocol GUI</Tool>
            <Tool title="Hyper Terminal">
              Extensible terminal
              {/* I’m honestly not even sure what features I get with this that
              aren’t just part of the macOS Terminal but it’s what I use. */}
            </Tool>
            <Tool title="TablePlus">
              Database management
              {/* Great software for working with databases. Has saved me from
              building about a thousand admin interfaces for my various projects
              over the years. */}
            </Tool>
            <Tool title="Postman">API management</Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Photoshop">
              {/* We started using Figma as just a design tool but now it’s become
              our virtual whiteboard for the entire company. Never would have
              expected the collaboration features to be the real hook. */}
            </Tool>
            <Tool title="Illustrator"></Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Apple">Mail, iCloud, etc.</Tool>
            <Tool title="Discord">Team collaboration</Tool>
            {/* <Tool title="Alfred">
              It’s not the newest kid on the block but it’s still the fastest.
              The Sublime Text of the application launcher world.
            </Tool>
            <Tool title="Reflect">
              Using a daily notes system instead of trying to keep things
              organized by topics has been super powerful for me. And with
              Reflect, it’s still easy for me to keep all of that stuff
              discoverable by topic even though all of my writing happens in the
              daily note.
            </Tool>
            <Tool title="SavvyCal">
              Great tool for scheduling meetings while protecting my calendar
              and making sure I still have lots of time for deep work during the
              week.
            </Tool>
            <Tool title="Focus">
              Simple tool for blocking distracting websites when I need to just
              do the work and get some momentum going.
            </Tool> */}
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
