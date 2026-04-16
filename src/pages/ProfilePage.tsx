type Props = {
  fullName?: string | null;
  email?: string;
  canTransact: boolean;
  onDeleteAccount: () => void;
};

export default function ProfilePage({ fullName, email, canTransact, onDeleteAccount }: Props) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <h2 className="text-lg font-semibold">Profile & Security</h2>
      <p className="mt-2 text-sm text-slate-300">Name: {fullName || 'User'}</p>
      <p className="text-sm text-slate-300">Email: {email}</p>
      <p className="text-sm text-slate-300">Can transact: {canTransact ? 'Yes' : 'No'}</p>
      <button
        className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
        onClick={onDeleteAccount}
      >
        Delete account
      </button>
    </section>
  );
}
