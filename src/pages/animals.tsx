import { loadAnimals } from "../utils/animal-store.ts";
import { Anchor } from "../components/Anchor.tsx";
import { Page } from "../components/Page.tsx";
import { Heading } from "../components/Heading.tsx";
import { FormattedMessage } from "react-intl";

export function Animals() {
  const animals = loadAnimals();

  return (
    <Page>
      <Heading level={1} className="pb-4">
        <FormattedMessage
          id="page-animals-heading"
          defaultMessage="Your Animals"
        />
      </Heading>
      <ul className="flex flex-col gap-2 py-4">
        {animals.map((animal) => (
          <li key={animal.id} className="flex w-full">
            <a
              href={`/animal/${animal.id}`}
              className="flex w-full items-center justify-between rounded border border-gray-300 bg-white p-4 text-xl hover:border-orange-300"
            >
              <div className="invisible h-8 w-8" />
              <div>{animal.name}</div>
              <img
                src={animal.type.imgSrc}
                alt={animal.type.imgAltMessageId}
                className="h-8 w-8"
              />
            </a>
          </li>
        ))}
      </ul>
      <Anchor href="/add-animal" variant="button" className="justify-center">
        <FormattedMessage id="add-animal-btn" defaultMessage="Add Animal" />
      </Anchor>
    </Page>
  );
}
