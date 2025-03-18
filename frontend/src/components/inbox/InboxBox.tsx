import { useState } from "react";
import InboxTopBar from "./InboxTopBar";
import InboxBottomBar from "./InboxBottomBar";
import MailItem from "./MailItem";
import EmailDetails from "./EmailDetails";

export default function InboxBox() {
  const [selectedMail, setSelectedMail] = useState<number | null>(null);

  const mails = [
    {
      id: 0,
      subject: "Material UI",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!",
      time: "3:45 PM",
    },
    // Add more mails here
  ];

  const handleBack = () => setSelectedMail(null);
  const handlePrev = () => {
    if (selectedMail !== null && selectedMail > 0) {
      setSelectedMail(selectedMail - 1);
    }
  };
  const handleNext = () => {
    if (selectedMail !== null && selectedMail < mails.length - 1) {
      setSelectedMail(selectedMail + 1);
    }
  };

  return (
    <div className="mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 w-full max-w-[1280px] text-center">
      <InboxTopBar
        emailDetailsView={selectedMail !== null}
        onBack={handleBack}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <div className="h-screen overflow-y-auto">
        <div className="custom-scrollbar block h-full max-h-full overflow-auto">
          {selectedMail === null ? (
            mails.map((mail) => (
              <MailItem
                key={mail.id}
                id={mail.id}
                subject={mail.subject}
                content={mail.content}
                time={mail.time}
                onClick={() => setSelectedMail(mail.id)}
              />
            ))
          ) : (
            <EmailDetails />
          )}
        </div>
      </div>
      <InboxBottomBar emailDetailsView={selectedMail !== null} />
    </div>
  );
}