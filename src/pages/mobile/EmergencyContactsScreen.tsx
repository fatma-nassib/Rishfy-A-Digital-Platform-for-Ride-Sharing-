import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Phone, ShieldAlert, User, Plus, Trash2 } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
}

interface Contact {
  name: string;
  phone: string;
  relation: string;
}

const EmergencyContactsScreen: React.FC<Props> = ({ onNavigate }) => {
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Primary Contact", phone: "+255 712 000 000", relation: "Family" },
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) return;
    setContacts((prev) => [
      ...prev,
      { name: name.trim(), phone: phone.trim(), relation: relation.trim() || "Contact" },
    ]);
    setName("");
    setPhone("");
    setRelation("");
  };

  const handleRemove = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <button onClick={() => onNavigate("profile")} className="mb-4">
        <ArrowLeft size={20} className="text-foreground" />
      </button>

      <h1 className="text-lg font-bold text-foreground mb-1">Emergency contacts</h1>
      <p className="text-sm text-muted-foreground mb-4">
        These contacts are notified when you trigger an emergency during a trip.
      </p>

      <div className="flex items-start gap-3 mb-4 rounded-xl bg-destructive/5 border border-destructive/20 px-3 py-3">
        <ShieldAlert className="text-destructive mt-0.5" size={18} />
        <p className="text-xs text-destructive">
          Emergency alerts share your live location, driver details and trip information with the
          Rishfy safety team and selected contacts.
        </p>
      </div>

      <div className="space-y-2 mb-5">
        {contacts.map((c, index) => (
          <div
            key={`${c.name}-${index}`}
            className="flex items-center gap-3 px-3 py-3 rounded-xl border border-input bg-background"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="text-primary" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.phone}</p>
              <p className="text-[11px] text-muted-foreground">{c.relation}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-destructive/40 text-destructive"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <p className="text-xs font-semibold text-muted-foreground mb-2">Add new contact</p>
        <div className="space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone size={16} className="text-primary" />
            </div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+255 7XX XXX XXX"
              className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <input
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder="Relation (family, friend, colleague)"
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Save contact
      </button>
    </div>
  );
};

export default EmergencyContactsScreen;

