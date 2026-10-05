/**
 * components/Home.jsx
 * ---------------------------------------------------------------------------
 * Dashboard: overall progress, one card per track, and the two most useful
 * entry points (resume last chapter, jump to the interview question bank).
 */

import { TRACKS } from '../data/catalog.js';
import { chapterPath, navigateTo, trackPath } from '../hooks/useHashRoute.js';
import { useStudy } from '../context/StudyContext.jsx';
import { Button, IconArrowRight, ProgressBar } from './ui.jsx';

export default function Home() {
  const { stats, lastChapter } = useStudy();

  return (
    <div className="home mx-auto w-full">
      <header className="home__header">
        <p className="mb-2 text-[0.72rem] font-bold tracking-[0.14em] text-brand uppercase">
          JavaScript · Frontend · Backend · Interview
        </p>
        <h1 className="home__title text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          FE/BE Interview Prep
        </h1>
        <p className="home__lead mt-3 max-w-[65ch] text-[1.02rem] text-muted">
          Kumpulan materi persiapan technical test: JavaScript sampai asynchronous, React dan keamanan
          web, Spring Boot plus Kafka dan Redis, lalu bank pertanyaan interview. Semua berjalan lokal
          di browser, progres tersimpan otomatis.
        </p>

        <div className="home__progress mt-5 grid max-w-xl gap-2">
          <ProgressBar percent={stats.percent} size="lg" />
          <p className="text-sm text-muted">
            <strong className="text-base text-ink">{stats.completed}</strong>/{stats.total} bab selesai ·{' '}
            {stats.percent}%
          </p>
        </div>

        <div className="home__actions mt-5 flex flex-wrap gap-3">
          {lastChapter && (
            <Button variant="primary" size="lg" onClick={() => navigateTo(chapterPath(lastChapter))}>
              Lanjutkan dari bab terakhir
              <IconArrowRight width={16} height={16} />
            </Button>
          )}
          <Button as="a" href={trackPath('interview')} variant="soft" size="lg">
            Buka bank pertanyaan interview
          </Button>
        </div>
      </header>

      <ul className="home__tracks mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
        {TRACKS.map((track) => {
          const trackStats = stats.perTrack[track.id];
          return (
            <li key={track.id} className="home__track">
              <a
                href={trackPath(track.id)}
                className="home__track-link grid h-full gap-2 rounded-2xl border border-line bg-panel p-5 text-ink no-underline shadow-card transition hover:-translate-y-0.5 hover:border-brand hover:shadow-float"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="home__track-icon grid size-10 place-items-center rounded-xl bg-brand-soft text-xs font-extrabold text-brand"
                    aria-hidden="true"
                  >
                    {track.icon}
                  </span>
                  <span className="home__track-label text-lg font-bold">{track.label}</span>
                </span>
                <span className="home__track-hint text-sm text-muted">{track.hint}</span>
                <span className="home__track-stats text-xs text-muted">
                  {trackStats.modules} modul · {trackStats.total} bab · {trackStats.minutes} menit
                </span>
                <ProgressBar percent={trackStats.percent} />
                <span className="home__track-count text-xs text-muted">
                  {trackStats.completed}/{trackStats.total} selesai
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <section className="home__how mt-12 max-w-[70ch] rounded-2xl border border-line bg-panel p-6 shadow-card">
        <h2 className="text-lg font-bold">Cara pakai</h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted">
          <li>Pilih track, lalu buka modul yang ditandai P1 lebih dulu.</li>
          <li>
            Tekan <strong className="text-ink">Tandai selesai</strong> (atau tombol <kbd className="rounded border border-line px-1 font-mono text-xs">S</kbd>)
            setelah paham. Progres, checklist, dan catatan tersimpan di LocalStorage.
          </li>
          <li>Gunakan pencarian di bagian atas untuk topik atau potongan kode.</li>
          <li>Track Interview berisi pertanyaan technical test plus cara memposisikan pengalaman Performance Test Engineer.</li>
        </ol>
      </section>
    </div>
  );
}