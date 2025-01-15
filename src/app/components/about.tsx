const About: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
          Margit Lisa Röder
        </h1> */}

        {/* Introduction Paragraph */}
        <div className="max-w-3xl mx-auto mb-8">
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Margit Lisa Röder, Jahrgang 1961, lebt mit ihrem Partner und ihrem Labradoodle
            Mila in einem bezaubernden alten Pfarrhaus im Landkreis Rosenheim am Chiemsee.
            Ihre Hobbys: Kochen und natürlich Fotografieren mit Nachbearbeitung und
            Entwicklung in Photoshop.
          </p>
        </div>

        {/* Detailed Biography */}
        <div className="max-w-3xl mx-auto mb-8">
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
            Margit Lisa Röders Faszination für die Fotografie wurde durch den 
            renommierten Künstler und Fotografen Heinz Teufel geweckt. Unter seiner
            Anleitung in seiner „Schule des Sehens“ begann sie eine Auseinandersetzung mit der
            Fotografie, die weit über die bloße Kameratechnik hinausging. Stattdessen taucht
            sie in die Bereiche des künstlerischen Ausdrucks, der Spiritualität, Sinnlichkeit
            und kritischen Selbstbetrachtung ein. Sie entdeckte die Fotografie als kraftvolles
            Medium zur Reflexion über Natur, Menschlichkeit und Umwelt. In einem Meisterkurs
            an der Leica Akademie, geleitet von Referent Robert Mertens, beschäftigte sie sich
            mit den Feinheiten der Bildsprache und Kreativität in der Fotografie.
          </p>

          {/* Second Paragraph */}
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            Heute ist Margit Lisa Röder nicht nur eine leidenschaftliche
            Architekturfotografin. Die Künstlerin fängt auch Elemente der Natur ein und
            experimentiert mit Texturen und Farben. Sie transformiert und kombiniert diese,
            um eine fiktive Natur zu schaffen, die teils üppig als auch extravagant wirkt.
          </p>
        </div>

        {/* Ausstellungen und Erfolge */}
        <div className="container mx-auto px-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-6 font-[family-name:var(--font-geist-mono)] text-center">
            Ausstellungen und Erfolge
          </h3>

          <div className="max-w-3xl mx-auto mb-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2013
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Kunstausstellung zugunsten kenianischer Waisenkinder
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2018
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Verleihung des Fotografenstatus in der weltweit exklusivsten kuratierten Fotogalerie 1x.com
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2019
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Bayerischer Vizemeister DVF (Deutscher Verband für Photographie)
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2022
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Deutscher Vizemeister (DVF)
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2023
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Shortlist Sony World Organization - Alpha Female Award
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2023
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Shortlist Siena International Photo Award / Creative Award
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2023
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Fotografie - aktuelle Positionen, Galerie Altes Rathaus Prien
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2024
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Nominierte Sony World Organization – Alpha Female Award
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                  2025
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Veröffentlichung des Bildes „Siena“ im Zeit Magazin „Wissen“
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
