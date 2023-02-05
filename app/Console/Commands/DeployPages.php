<?php

namespace App\Console\Commands;

use App\Models\Page;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployPages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:pages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset to the default static pages';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::unprepared('truncate table pages');
        Page::create([
            'title' => 'Snarkpit history',
            'slug' => 'about-us',
            'content_text' => self::ABOUT_US_PAGE,
            'content_html' => bbcode(self::ABOUT_US_PAGE)
        ]);
        Page::create([
            'title' => 'Contact us',
            'slug' => 'contact',
            'content_text' => 'If you are having any troubles with the site, please contact the site admin, Riven, at <EMAIL_HERE>.',
            'content_html' => 'If you are having any troubles with the site, please contact the site admin, Riven, at &lt;EMAIL_HERE&gt;.'
        ]);

        return Command::SUCCESS;
    }

    const ABOUT_US_PAGE = "= The Gospel according to St Leperous

== Genesis

%%columns=6:6
Sooo. The SnarkPit then. The 'ancestor' of this site first started out being hosted on AOL- 5 pages of awesome editing knowledge (created with AOLPress, one of the most powerful website tools ever- more so than Geocities Pagebuilder). Back then, it was just \"Leperous' Worldcraft Website\" and had a fantastic top banner which, sadly, has been lost.
%%
[img:http://snarkpit.net/images/about_1.jpg]
%%

%%columns=6:6
[img:http://snarkpit.net/images/about_2.jpg]
%%
Anyhoo, the website moved around a bit, and became gameditors.co.uk for a while (I had a plan to create an editing empire, like most normal people should do. I was young). And lo, the website became fully editing orientated and FrontPage built.
%%

%%columns=6:6
We then started doing reviews after a short while- first website I knew about that combined editing with reviewed examples of what to (not) do- and moved to another host when the bandwidth use got a bit much. Then, cunningly, we decided to track down every OP4 map ever made and offer them up for download, and got kicked off our new host (sprite-network) for, er, bandwidth. But hooray for PlanetHalflife for hosting us back in August 2000 (it used to be a great website, before the Lamespy rot kicked in), we could host all the maps we ever dreamed of on Fileplanet- back in those days, you didn't have to queue to download maps.

That was the 'golden age' of reviewing, with a spinkee new PHP review database being built (Über kudos to ScaryJeff, this site wouldn't be here today without his help) and a not-so-spinkee ezBoard forum. ezBoard forum was (still is!) rubbish, moved to ForumPlanet which was even worse as ASP is the tool of the devil, and then ended up with phpBB, the framework of which eventually helped create this new site when I decided that I'd had enough of popup ads.
%%
[img:http://snarkpit.net/images/about_3.jpg]
%%

%%columns=6:6
[img:http://snarkpit.net/images/about_4.jpg]
%%
So, the PHPtastic site you see opposite was rolled out in February 2002 at *www.snarkpit.com* after months of work, hosted by [http://www.edgenetwork.org/|EdgeNetwork]. A \"mapfinger\" ability to add maps to your profile was introduced here, along with your own \".plan\" (as they were known back in the day).
%%

== Exodus

%%columns=6:6
They got a bit silly with map downloads, and for various unrememberable reasons we moved to a new host [http://www.oktagone.net.au/|Oktagone] sometime in 2003, and despite the 90% downtime stuck with them for a while yet. Along the way, I managed to pick up a few drifters who I managed to beat into becoming 'staff'- Mikee, Versager, some guy with 'Dragon' in his name who was hell-bent on collecting all the OP4 maps ever created, and of course Gwil who still to this day just loafs around doing nothing except complaining about the Wicked Ways of the Western World.
%%
[img:http://snarkpit.net/images/about_5.jpg]
%%

%%columns=6:6
[img:http://snarkpit.net/images/about_6.jpg]
%%
However, at the beginning of 2005, our hosts Oktagone went through a number of problems. First, they claimed that a power outage had cut off everyone's website for the time being, when in fact the real reason was because they hadn't paid their server bills. It took 2 weeks of pestering the quite clearly incapable boss in an IRC room to get the website back up at the beginning of March, in their new datacenter that they'd built (on a free hosting plan!). But then mid-March, they claimed that a DDoS attack on their network had effectively bankrupted them (again, probably a lie, but who knows- at least they weren't too busy to make themselves a brand new website in the mean time) and the site went down for another 2 weeks. E-mails asking for the domain name back went ignored, and finally when my requests started to be bounced, we moved domain to snarkpit.net, and are currently hosted by [http://www.globat.com/|Globat] who, despite their many (oft hidden) faults, are still pretty damn cheap.
%%

%%columns=6:6
And what for the future? If I were a futurist I'd certainly hire Monqui, as I like the cut of his jib. And remind him that we have crushed all who oppose us in the past!
%%
[img:http://snarkpit.net/images/about_7.jpg]
%%

= The Book of Larch

== Revelations

%%columns=6:6
By 2008 most of the original site founders had moved on, leaving the remaining community struggling to develop the site further or even fix various code errors which began to increasingly appear as time passed by.

To bring the site up to date Gwil, who had assumed the day to day running of The Snarkpit, asked larchy to have a look at modernising the site. While actively involved in web development it had been a long time since I had been a part of a community gaming project like this and I knew what a potentially difficult and unforgiving task could be lying in store. Nevertheless I delved into the thoughts of the community members on the message boards and came up with a few ideas which I hoped would make all the great content on Snarkpit more easily accessible and generally improve the design and function of the site. This led, after a few months, to the new site shown opposite, which included a new brighter theme and a darker theme for members who preferred the old style of the site.
%%
[img:http://snarkpit.net/images/about_8.jpg]
%%

%%columns=6:6
[img:http://snarkpit.net/images/about_9.jpg]
%%
At first things started out as a small revamp of the existing code, but soon developed into a complete redesign of the site's database to enable a few of the new requested features, such as the site admins being able to manage all the games and mods on the site from the site's admin interface. This also required a reorganising of all the content, and ended up with the entire site being recoded from scratch. The new site underwent an open beta test for a couple of months before being made live in the Summer to mixed reception.
%%

%%columns=6:6
I continued developing the new site, re-adding things which had been overlooked during the initial redevelopment and generally fixing various bugs which cropped up.

All of which neatly brings us to the present day, which continues to see the new site developed along with much active help and feedback from site members such as aaron_da_killa & Riven, and notably Muhnay who did much of the great graphics work on the newer more old-style theme opposite!
%%
[img:http://snarkpit.net/images/about_10.jpg]
%%";
}
