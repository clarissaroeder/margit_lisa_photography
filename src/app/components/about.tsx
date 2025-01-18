"use client";

import { useState } from "react";
import Image from "next/image";

const achievements = [
  { year: "2013", description: "Kunstausstellung zugunsten kenianischer Waisenkinder" },
  { year: "2018", description: "Fotografenstatus in der Fotogalerie 1x.com" },
  { year: "2019", description: "Bayerischer Vizemeister DVF" },
  { year: "2022", description: "Deutscher Vizemeister (DVF)" },
  { year: "2023", description: "Shortlist Sony World Organization - Alpha Female Award" },
  { year: "2024", description: "Nominierte Sony World Organization – Alpha Female Award" },
  { year: "2025", description: "Veröffentlichung im Zeit Magazin „Wissen“" },
];

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"about" | "achievements">("about");

  return (
    <section className="bg-white dark:bg-gray-900 pt-16 py-12 font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Circular Image */}
          <div className="relative w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden mx-auto md:mx-0 md:mt-8">
            <Image
              src="/margit_lisa_roeder.jpg"
              alt="Margit Lisa Röder"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Tabs and Content */}
          <div className="flex-1 w-full">
            {/* Tabs */}
            <div className="flex justify-center md:justify-start gap-6 mb-6">
              <button
                className={`pb-2 px-4 text-lg font-[family-name:var(--font-geist-mono)] ${
                  activeTab === "about"
                    ? "border-b-2 border-custom-orange-2 text-custom-orange-2"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setActiveTab("about")}
              >
                Über Margit Lisa Röder
              </button>
              <button
                className={`pb-2 px-4 text-lg font-[family-name:var(--font-geist-mono)] ${
                  activeTab === "achievements"
                    ? "border-b-2 border-custom-orange-2 text-custom-orange-2"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setActiveTab("achievements")}
              >
                Ausstellungen und Erfolge
              </button>
            </div>

            {/* Content */}
            <div
              className="text-gray-700 dark:text-gray-300 space-y-6 transition-all min-h-[12rem]" // Ensure fixed height
            >
              {activeTab === "about" && (
                <>
                  <p>
                    Margit Lisa Röder, Jahrgang 1961, lebt mit ihrem Partner und ihrem Labradoodle
                    Mila in einem bezaubernden alten Pfarrhaus im Landkreis Rosenheim am Chiemsee.
                    Ihre Hobbys: Kochen und natürlich Fotografieren mit Nachbearbeitung und
                    Entwicklung in Photoshop.
                  </p>
                  <p>
                    Margit Lisa Röders Faszination für die Fotografie wurde durch den 
                    renommierten Künstler und Fotografen Heinz Teufel geweckt. Unter seiner
                    Anleitung in seiner „Schule des Sehens“ begann sie eine Auseinandersetzung mit der
                    Fotografie, die weit über die bloße Kameratechnik hinausging. Stattdessen taucht
                    sie in die Bereiche des künstlerischen Ausdrucks, der Spiritualität, Sinnlichkeit
                    und kritischen Selbstbetrachtung ein. Sie entdeckte die Fotografie als kraftvolles
                    Medium zur Reflexion über Natur, Menschlichkeit und Umwelt.
                  </p>
                  <p>
                    Heute ist Margit Lisa Röder nicht nur eine leidenschaftliche
                    Architekturfotografin. Die Künstlerin fängt auch Elemente der Natur ein und
                    experimentiert mit Texturen und Farben. Sie transformiert und kombiniert diese,
                    um eine fiktive Natur zu schaffen, die teils üppig als auch extravagant wirkt.
                  </p>
                </>
              )}

              {activeTab === "achievements" && (
                <ul className="space-y-4">
                  {achievements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 text-custom-orange-1 font-semibold mr-4">
                        {item.year}
                      </span>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
