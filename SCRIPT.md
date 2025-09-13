Delivered-To: bernardjohnson357@gmail.com
Received: by 2002:a05:6130:4b87:b0:87e:e53a:da37 with SMTP id hh7csp81553uab;
        Tue, 29 Jul 2025 04:44:10 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IH5XyjLxI5UYYXzEtmnA5pauVvioHL+Tsn+37FDTpgcBgATG3VN3P57fezjDD+oPxaLlLqK
X-Received: by 2002:a05:6214:1d25:b0:707:52f9:5253 with SMTP id 6a1803df08f44-70752f9541fmr62793056d6.11.1753789450047;
        Tue, 29 Jul 2025 04:44:10 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1753789450; cv=none;
        d=google.com; s=arc-20240605;
        b=iQ+69DuyzEgcpuYzD+hj02T3zCBUbmTf+trUborN1E6BZ3Hf1ewBeT5elp+z7LFPNq
         CqzNuLZu0du4+9WYUt9MTIAH24S/BG1rxuEn7qxWmwoqtMZeHa0WnS5BAegUVAidVAdy
         KwuLW+7dL5CK512CyzsGMpBmPtrnPn06oKs7h0MlBfVTkN+FiUom2HjhfpWR8uFbrK6k
         JTcEQtINlGR0LT/EHLQQfgZ2HiLT776toeF0MJ/TaxBmqZkfoNS4mnxGMMgRKrjo5uNC
         u8rPgM0qXese0OcYQt/XGs2WWGSz9ItPMweX3mAmmpozD7VblCzMYtjvJpxXEmic1jKV
         XNwQ==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=to:list-unsubscribe-post:list-unsubscribe:content-transfer-encoding
         :mime-version:subject:message-id:from:date:dkim-signature
         :dkim-signature;
        bh=8jtfGimlhpxMnxKKaksmsQiSIEhCA64gc18dGia4Jbw=;
        fh=jtJrmIt4QF+DQJ7ux/xoe8DvlK4Vo6hZj6DQ/8O8ZHg=;
        b=h8SjvheNP4qjSOpkBNx1oFRpfOYF5b21adNBjcAl0i0g4i++lQRff2zTr/g29bOoze
         albcDHwD8pBnTISo3+KRtr7V2N4SavvHAeWktz61r57IWyVyvpDZZWxtp3Xf1qfWRYch
         ovEo3Y1JEGJN4HJ4HL+ZYmwhpqmXp3WD/pr+FGafyY5XiHvAY6Zswg5kcOE3/UFS8cmE
         QERqdYEhoIsrdOw6gw4xd4uvM+WEDRU//jbaPyEiT2AIH2/VG8t0mQ47W2igbcSb1f6S
         QWQY26fLUiiFh0wiOkBbEDx7dvtEqKp7C6kBJmX4ITUK2t7rUMgpvRTK1xGyBN7YifRE
         dwdw==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@nationsend19.com header.s=s1 header.b=nwNfCUrW;
       dkim=pass header.i=@sendgrid.info header.s=smtpapi header.b="ph/kPQMP";
       spf=pass (google.com: domain of bounces+2174868-5bb4-bernardjohnson357=gmail.com@em1.nationsend19.com designates 198.37.148.55 as permitted sender) smtp.mailfrom="bounces+2174868-5bb4-bernardjohnson357=gmail.com@em1.nationsend19.com";
       dmarc=fail (p=NONE sp=NONE dis=NONE) header.from=emailnb.com
Return-Path: <bounces+2174868-5bb4-bernardjohnson357=gmail.com@em1.nationsend19.com>
Received: from o59.email.nationbuilder.com (o59.email.nationbuilder.com. [198.37.148.55])
        by mx.google.com with ESMTPS id 6a1803df08f44-70729c15bd0si48724826d6.76.2025.07.29.04.44.09
        for <bernardjohnson357@gmail.com>
        (version=TLS1_3 cipher=TLS_AES_128_GCM_SHA256 bits=128/128);
        Tue, 29 Jul 2025 04:44:09 -0700 (PDT)
Received-SPF: pass (google.com: domain of bounces+2174868-5bb4-bernardjohnson357=gmail.com@em1.nationsend19.com designates 198.37.148.55 as permitted sender) client-ip=198.37.148.55;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@nationsend19.com header.s=s1 header.b=nwNfCUrW;
       dkim=pass header.i=@sendgrid.info header.s=smtpapi header.b="ph/kPQMP";
       spf=pass (google.com: domain of bounces+2174868-5bb4-bernardjohnson357=gmail.com@em1.nationsend19.com designates 198.37.148.55 as permitted sender) smtp.mailfrom="bounces+2174868-5bb4-bernardjohnson357=gmail.com@em1.nationsend19.com";
       dmarc=fail (p=NONE sp=NONE dis=NONE) header.from=emailnb.com
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=nationsend19.com;
	h=date:from:subject:mime-version:content-type:content-transfer-encoding:
	list-unsubscribe:list-unsubscribe-post:to:cc:content-type:date:feedback-id:from:
	subject:to;
	s=s1; bh=8jtfGimlhpxMnxKKaksmsQiSIEhCA64gc18dGia4Jbw=;
	b=nwNfCUrWY9MJAfkodAzPzRjyqyNL4iaw34w70UOzJjFfRAxFCpWD3x+SR4RJgL+CUrOp
	CJd0930y9Yo7ytfvbAivp/zIoDlarjbcwf4tnIQApYgabru0R2tShQeuBY0GRlaGydq8mu
	NFrYxW19GsFZgTfht6BjwY8jyw/bLbjda7nZr2GuOBGRLdy9TERbaS8pm5yijM+I20NhxP
	9WsxvoxxrgriA3/+jdqag4p5wElWDrwBZmkvsnj3cqLeKl6nR2LLFYtPJPOZwDezrCacNF
	eqHnyNt9OFzXbd3NMLlJBkhME2zEGIbIXWL3pAd8TWnHLO8Efnhg4qTavNCCJuZQ==
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=sendgrid.info;
	h=date:from:subject:mime-version:content-type:content-transfer-encoding:
	list-unsubscribe:list-unsubscribe-post:to:cc:content-type:date:feedback-id:from:
	subject:to;
	s=smtpapi; bh=8jtfGimlhpxMnxKKaksmsQiSIEhCA64gc18dGia4Jbw=;
	b=ph/kPQMPAYWH2QQgtgbuELEMOqKcKLZcbiw4VJTJl5WBZ3n3h2oRdOnKKr0mCKPU428n
	5BU2EdsYvxK8Oxak83Z56yRP4y3eX3LcungjSk+Gv0wmtf4B/t+pPXkPgKA9GpbHKZZvIh
	mU86K2L8UsBtuhyRxHFNfoa49BccRmbfY=
Received: by recvd-67b448fdcd-pjz5s with SMTP id recvd-67b448fdcd-pjz5s-1-6888B409-33
	2025-07-29 11:44:09.367975968 +0000 UTC m=+4733973.039152174
Received: from nationbuilder.com (unknown)
	by geopod-ismtpd-6 (SG)
	with ESMTP id LzZ3jlAcTOyOe4gOd302Lg
	for <sendingthrough@nationbuilder.com>;
	Tue, 29 Jul 2025 11:44:09.292 +0000 (UTC)
Date: Tue, 29 Jul 2025 11:44:09 +0000 (UTC)
From: Bernard Johnson 4 Congress <info@bernardjohnson4congress.emailnb.com>
Message-ID: <6888b409463e5_3d887dc244b@ip-10-30-103-48.ec2.internal.mail>
Subject: [TEST] (2nd Attempt) Confidential Campaign Update
Mime-Version: 1.0
Content-Type: multipart/alternative;
 boundary="--==_mimepart_6888b4093629a_3d887dc243e"
Content-Transfer-Encoding: 7bit
List-Unsubscribe: <https://www.bernardjohnson4congress.com/unsubscribe>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
X-SG-EID: 
 =?us-ascii?Q?u001=2EdS42Oxt7jfPq8ov2yMoteAsqBiofqzHmdCzat9OlEvbVDDo0vWkmyaGeY?=
 =?us-ascii?Q?rvd0ouLHBLARANya=2FnZx4VRkxmm4He4SDcjvYgl?=
 =?us-ascii?Q?t54hIWBIsIHgWlSANsX8MOH3TxyVPZDZtwaVq2E?=
 =?us-ascii?Q?d=2F+7MbvSYAetAqVC7ytoXl9Lo1gdVd7S6cJ1s9O?=
 =?us-ascii?Q?W56z5YIJ3NM6MQcz6lfmeF0rQWPTcEViocNijlG?=
 =?us-ascii?Q?ZaWjW7cuVuI8NHV0QJRV=2FU1+7PWBItRHYWblzzF?=
 =?us-ascii?Q?0+r0atUoExtzUuxgLarjlX=2FNmegAjyEXbeA1+ey?=
 =?us-ascii?Q?PB0tA7t0=3D?=
X-SG-ID: 
 =?us-ascii?Q?u001=2ESdBcvi+Evd=2FbQef8eZF3Bsh0QyR4wOUopK2abEQ+Yr85v9fn4ATIawpPc?=
 =?us-ascii?Q?PZEeD=2Fb7Wg7pIM7oqlNSD5nqZDmb9F7psmCQEzP?=
 =?us-ascii?Q?b=2FiLZkMyKYlkZBnmgyEJIW5xMVUzuwstDNCOcfW?=
 =?us-ascii?Q?sc1e1cRp9gRfRl4IzhWUMicezvsvO92yfPa4inO?=
 =?us-ascii?Q?DxFB=2FjSl3WB8URzYlHx9AZNUW=2Fhs2IP4FlUNxnm?=
 =?us-ascii?Q?ISxoL=2Fs2bDTywurS5fTXR0=3D?=
To: bernardjohnson357@gmail.com
X-Entity-ID: u001.q6QnI9jm+YasVdoeEdy7fA==


----==_mimepart_6888b4093629a_3d887dc243e
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: quoted-printable



Confidential Supporter Briefing

Private access for LPTX donors and core campaign partners.



You=E2=80=99re receiving this follow-up because our team noticed you may ha=
ve missed our earlier confidential update.

Bernard Johnson 2026 Campaign: Strategic Development Brief

Timeframe: May 2025 =E2=80=93 July 2025
Purpose: Transparency and accountability to our most trusted donors and all=
ies.

---

I. Campaign Infrastructure

  - Identity: Unapologetically Libertarian. Independent of legacy party bag=
gage. Rooted in facts over fanfare.
  - Slogan: =E2=80=9COne West Texas=E2=80=9D =E2=80=94 messaging focused on=
 unity and shared regional interest.
  - Website:BernardJohnson4Congress.com <https://www.bernardjohnson4congres=
s.com> =E2=80=94 full custom NationBuilder deployment.
  - Volunteer HQ: In progress =E2=80=94 will feature role-based onboarding,=
 NDAs, and youth consent compliance.
  - Donor Data: ZIP + tag-based segmentation now functional. HyDollar-level=
 supporters fully trackable for engagement and ROI.

---

II. Innovation: Gamified Voter Engagement

  - Two-Party Monopoly: Interactive trivia platform rewarding civic knowled=
ge with Liberty Bucks.
  - Game Ecosystem: Includes Big Government Bingo, Bill to Law (formerly Bu=
ild Your Own Bill), Ballot Breakout, Liberty Dash, and Candidate Simulator =
(currently blocked from public view for IP protection).
  - Scoring Logic:  - 80+ score =3D 1 Liberty Buck
  - Perfect game =3D 2 Liberty Bucks
  - 1 coin per full playthrough


  - Event QR Integration: 2x coin bonuses tied to in-person events to drive=
 turnout.

Strategic Rationale: The district includes multiple large universities (ACU=
, HSU, McMurry, Texas Tech) and numerous junior colleges. These games offer=
 organic opportunities for campus outreach, inter-college competition, and =
formation of Young Libertarian chapters.

---

III. Challenges & Strategic Fixes

IssueSolutionMobile menu bugsResolved with custom SCSS + toggle controlsNat=
ionBuilder block editor limitationsBypassed via direct template injectionYo=
uth volunteer complianceParental consent form with digital signature in dev=
elopmentFactional baggage (e.g., Mises)Pivoted focus toward unifying state-=
level messaging and leadership autonomy---

IV. What=E2=80=99s Gaining Traction

  - Messaging and tone consistent across platforms (web, email, Discord, pr=
int)
  - Gamification actively engaging Gen Z and politically disaffected indepe=
ndents
  - Early groundwork laid for PAC formation, merch store, and volunteer pip=
eline

---

V. Timeline: Key Milestones

DateMilestoneJuly 2025Finalize consent form, begin testing onboardingSept 2=
025Full release of Two-Party Monopoly (badges, leaderboard, memory bank)Dec=
 2025Test rollout of merch store and Liberty Bucks redemption systemLPTX Co=
nvention 2026Fully operational campaign ready for visibility + impactPost-C=
onventionLaunch PACs in education and entrepreneurship with designated trea=
surers---

VI. Confidential IP Safeguards

The Candidate Simulator platform remains restricted while core mechanics ar=
e finalized. Once tested, the framework can be licensed to other state part=
ies =E2=80=94 enabling customization to state-specific laws and filing requ=
irements while also opening the door to educational applications, homeschoo=
l use, and school voucher-compatible civic curricula.

---

VII. Internal Archive & Sustainability

We=E2=80=99re building a secure, exportable archive to ensure continuity:

  - All game rules and logic documentation
  - Consent + legal forms (minors, NDA)
  - Volunteer role definitions and onboarding packets
  - SCSS website notes + tester bug logs

---

This campaign isn't just about 2026. It's about building a future-ready pol=
itical infrastructure =E2=80=94 one where candidates, donors, and volunteer=
s are empowered, not dependent. Thank you for being part of this movement.



The Liberty Buck Coin
Earned through knowledge, not donations. The Liberty Buck is our way of rew=
arding civic engagement. Collect 8 by completing games and campaign actions=
, and you=E2=80=99ll be eligible for exclusive merch when our store launche=
s.



Merch with a Message (Local & Scalable)

The upcoming merch line includes a mix of message-forward items =E2=80=94 f=
rom unity themes like =E2=80=9COne West Texas=E2=80=9D and =E2=80=9CGolden =
Rule Governance: Be Nice=E2=80=9D, to more locally charged pieces like the =
=E2=80=9CX Out Jodey Arrington=E2=80=9D shirt, designed to connect with vot=
ers here in TX-19.

While these items are tailored to this district, the model behind them =E2=
=80=94 using branded, values-driven gear to spark conversations and signal =
voter alignment =E2=80=94 can be replicated by other Libertarian candidates=
. These shirts don=E2=80=99t just fundraise; they educate, provoke, and bui=
ld community.

Other campaigns are welcome to adopt this strategy, especially the =E2=80=
=9CGolden Rule Governance=E2=80=9D line, which is intentionally left open f=
or wider use across the state. We simply ask that candidates who build on t=
his messaging acknowledge its origin =E2=80=94 not out of ego, but to reinf=
orce the broader collaboration we=E2=80=99re trying to build within the par=
ty.

Continue reading <https://www.bernardjohnson4congress.com/coming_soon_merch=
_store>

IEP for America

Over the next several weeks, I'll be unveiling several new policy initiativ=
es to coincide with Phase 1 of my Individualized Emancipation Plan (IEP) fo=
r America. To review the details, click below:=C2=A0=C2=A0

Continue reading <https://www.bernardjohnson4congress.com/phase_i>

Visit the Political Games Hub

Thank you for your continued support! Please play all three rounds of "Two-=
Party Monopoly" along with the "How Bernard Are You?" quiz and leave a comm=
ent.

Continue reading <https://www.bernardjohnson4congress.com/political_games>

Final Thoughts...

We=E2=80=99ve made a lot of progress, from launching the Two-Party Monopoly=
 game to previewing the Liberty Buck coin, and there's more to come. I know=
 some of this might feel like new territory, especially for those who=E2=80=
=99ve been part of the Libertarian movement for decades.

But none of this replaces the hard work that came before. It builds on it. =
The tools we=E2=80=99re rolling out =E2=80=94 from the Candidate Simulator =
to Golden Rule Governance are designed to support candidates across Texas w=
ho want to step forward and lead in their own communities.

This isn=E2=80=99t just about one campaign. It=E2=80=99s about planting see=
ds for something stronger, long-term.

Thanks for being part of this.

=E2=80=94 Bernard

 <https://www.bernardjohnson4congress.com/donate>DONATE <https://www.bernar=
djohnson4congress.com/donate>Coming Soon...

The Candidate Simulator

Ever wonder what it takes to run for office? This interactive experience wi=
ll challenge players and future candidates alike to build coalitions, survi=
ve media storms, and win support, all while trying to stay true to their pr=
inciples.

Watch for the official launch this fall.



 <https://www.facebook.com> <https://www.twitter.com> <https://www.linkedin=
.com> <https://www.instagram.com> <https://www.bernardjohnson4congress.com/=
>Bernard Johnson 4 Congress =C2=B7 2701 Nonesuch Rd., Apt 2107, Abilene, TX=
 79606, United States=20
This email was sent to bernardjohnson357@gmail.com <> =C2=B7 Unsubscribe <h=
ttps://www.bernardjohnson4congress.com/unsubscribe>

Created with NationBuilder <https://nationbuilder.com>. Build the Future.





----==_mimepart_6888b4093629a_3d887dc243e
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: quoted-printable

<!DOCTYPE html>
<html lang=3D"en" xmlns:v=3D"urn:schemas-microsoft-com:vml">
 =20
  <head>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DUTF-8">
<meta>
  <meta name=3D"x-apple-disable-message-reformatting">
  <meta>
  <meta name=3D"viewport">
  <meta name=3D"format-detection">
  <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings
          xmlns:o=3D"urn:schemas-microsoft-com:office:office"
        >
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <style>
      td,
      th,
      div,
      p,
      a,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Segoe UI', sans-serif;
        mso-line-height-rule: exactly;
      }
    </style>
  <![endif]-->
  <style>
    html {
      height: 100%;
    }
    body {
      margin: 0;
      width: 100%;
      padding: 0;
      word-break: break-word;
      -webkit-font-smoothing: antialiased;
      background-color: #ffffff;
      height: 100%;
    }

    /* Outlook on MacOS */
_:-webkit-full-screen, _::-webkit-full-page-media, _:future, :root
p, :root h1, :root h2, :root h3, :root h4 {
      margin: 1em 0 1em 0;
    }

    /* Canvas Styles */

        td.canvas {
          background-color: #FFFFFF;
        }

        td.canvas {
          padding-top: 0px;
          padding-bottom: 16px;
        }

        td.canvas p, td.canvas li {
          font-family: Helvetica,Verdana,Arial,sans-serif;
          font-size: 16px;
          font-weight: normal;
          color: #000000;
        }

        td.canvas p a, td.canvas li a {
          color: #000000;
        }

        td.canvas h1 {
          font-family: Helvetica,Verdana,Arial,sans-serif;
          font-size: 36px;
          font-weight: bold;
          color: #000000;
        }

        td.canvas h2 {
          font-family: Helvetica,Verdana,Arial,sans-serif;
          font-size: 24px;
          font-weight: bold;
          color: #000000
        }

        td.canvas h3 {
          font-family: Helvetica,Verdana,Arial,sans-serif;
          font-size: 20px;
          font-weight: bold;
          color: #000000;
        }

        td.canvas h4 {
          font-family: Helvetica,Verdana,Arial,sans-serif;
          font-size: 18px;
          font-weight: normal;
          color: #000000;
        }

    td.canvas img {
      max-width: 100%;
    }

    /* End of Canvas */

    @media (max-width: 480px) {
      .two-column {
        display: flex;
        flex-direction:column;
      }
      .two-column > tbody > tr > td {
        width: 100% !important;
        display: block;
      }
      .text > tbody > tr > td {
        padding: 0 1em !important;
        width: 100% !important;
      }
      .image > tbody > tr > td {
        padding: 0 1em !important;
        width: 100% !important;
      }

      .image--full-block > tbody > tr > td {
        padding: 0 !important;
        width: 100% !important;
      }
      .image--full-block > tbody > tr > td > div > img {
        width: 100% !important;
      }
      .backdrop {
       =20
       =20
       =20
      }
        td.canvas p, td.canvas li {
        font-size: 16px;
      }
        td.canvas h1 {
        font-size: 28px;
      }
        td.canvas h2 {
        font-size: 24px;
      }
        td.canvas h3 {
        font-size: 20px;
      }
        td.canvas h4 {
        font-size: 18px;
      }
    }
    @media (max-width: 660px) {
      .sm-w-full {
        width: 100% !important;
        min-width: 100% !important;
      }
      .sm-pt-0 {
        padding-top: 0 !important;
      }
    }
  </style>


  </head>
<body>
<div style=3D"display:none;max-height:0px;overflow:hidden;">
The Legacy Parties Will Want To Sue Over This
</div>
<div style=3D"display:none;max-height:0px;overflow:hidden;">
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=
=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=
=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=
=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=C2=A0=
=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=
=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=
=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=
=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=
=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wbr>=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=
=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C<wb=
r>=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=8C=C2=A0=E2=80=
=8C=C2=A0
</wbr></wbr></wbr></wbr></wbr></wbr></wbr></wbr></wbr></wbr></wbr></wbr></w=
br>
</div>

  <div lang=3D"en" style=3D"min-height:100%;background-color:#fbda4a;">
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
class=3D"sm-w-full" style=3D"
        min-width:100%;
        width:100%;
        font-family:Helvetica,Verdana,Arial,sans-serif;
      " width=3D"100%">
      <tbody>
<tr>
<td align=3D"center" class=3D"backdrop"
style=3D"height:auto;min-height:100%;background-color:#fbda4a;padding-top:3=
2px;padding-bottom:32px;">
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
class=3D"sm-w-full" style=3D"min-width:664px;width:664px;" width=3D"664">
            <tbody>
<tr>
              <td align=3D"center">
<table border=3D"0" bgcolor=3D"#ffffff" class=3D"sm-w-full"
cellpadding=3D"0" cellspacing=3D"0" style=3D"min-width:100%;width:100%;"
width=3D"100%">
                  <tbody>
<tr>
                    <td class=3D"canvas">
                     =20

<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"image"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;table-layout:f=
ixed;min-width:100%;width:100%;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td style=3D"text-align:left;padding:0
2em;min-width:596px;width:596px;" width=3D"596">
        <div style=3D"display:block;">
            <!--[if mso]>
<img style=3D"vertical-align:middle;" width=3D"596"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/Bernardsquare.png?1753044053"
/>
            <![endif]-->
            <!--[if !mso]><!-->
<img style=3D"vertical-align:middle;" width=3D"100%"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/Bernardsquare.png?1753044053">
            <!--<![endif]-->
</div>
</td>    </tr>
  </tbody>
</table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"text"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;background-color:#fcda4a;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <!--[if mso]>
      <tr style=3D"margin:0;padding:0;">
<td style=3D"padding: 1em 0 0; line-height:
1px;background-color:#fcda4a;"></td>
      </tr>
    <![endif]-->
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;background-color:#fcda4a;padding:0.05px
2em;min-width:560px;width:560px;" width=3D"560">
<div class=3D"vip-report-box">
<h2 style=3D"color: #fed000; font-size: 2em; margin-bottom: 0.25em;
text-align: center;"><span style=3D"color: #000000;">Confidential
Supporter Briefing</span></h2>
<p style=3D"text-align: center; font-style: italic; color:
#56565a;">Private access for LPTX donors and core campaign
partners.</p>
</div>
<div class=3D"chair-note" style=3D"background-color: #fffbea; border: 2px
solid #FED000; padding: 1em; margin-top: 1em;"><em>You=E2=80=99re receiving
this follow-up because our team noticed you may have missed our
earlier confidential update.</em></div>
<p>=C2=A0</p>
<hr>
<h3>Bernard Johnson 2026 Campaign: Strategic Development Brief</h3>
<p><strong>Timeframe:</strong> May 2025 =E2=80=93 July
2025<br><strong>Purpose:</strong> Transparency and accountability to
our most trusted donors and allies.</p>
<p>---</p>
<h4>I. Campaign Infrastructure</h4>
<ul>
<li>
<strong>Identity:</strong> Unapologetically Libertarian. Independent
of legacy party baggage. Rooted in facts over fanfare.</li>
<li>
<strong>Slogan:</strong> =E2=80=9COne West Texas=E2=80=9D =E2=80=94 messagi=
ng focused on unity
and shared regional interest.</li>
<li>
<strong>Website:</strong> <a title=3D"About Bernard Johnson"
rel=3D"noopener"
href=3D"https://www.bernardjohnson4congress.com?e=3D2c8a59b46232ffe020d8ffc=
aeabbbcd9&amp;utm_source=3Dbernardjohnson4congress&amp;utm_medium=3Demail&a=
mp;utm_campaign=3Dlptx_donors_follow_up&amp;n=3D1&amp;test_email=3D1"
target=3D"_blank">BernardJohnson4Congress.com</a> =E2=80=94 full custom
NationBuilder deployment.</li>
<li>
<strong>Volunteer HQ:</strong> In progress =E2=80=94 will feature role-base=
d
onboarding, NDAs, and youth consent compliance.</li>
<li>
<strong>Donor Data:</strong> ZIP + tag-based segmentation now
functional. HyDollar-level supporters fully trackable for engagement
and ROI.</li>
</ul>
<p>---</p>
<h4>II. Innovation: Gamified Voter Engagement</h4>
<ul>
<li>
<strong>Two-Party Monopoly:</strong> Interactive trivia platform
rewarding civic knowledge with Liberty Bucks.</li>
<li>
<strong>Game Ecosystem:</strong> Includes Big Government Bingo, Bill
to Law (formerly Build Your Own Bill), Ballot Breakout, Liberty Dash,
and <em>Candidate Simulator</em> (currently blocked from public view
for IP protection).</li>
<li>
<strong>Scoring Logic:</strong>
<ul>
<li>80+ score =3D 1 Liberty Buck</li>
<li>Perfect game =3D 2 Liberty Bucks</li>
<li>1 coin per full playthrough</li>
</ul>
</li>
<li>
<strong>Event QR Integration:</strong> 2x coin bonuses tied to
in-person events to drive turnout.</li>
</ul>
<p><strong>Strategic Rationale:</strong> The district includes
multiple large universities (ACU, HSU, McMurry, Texas Tech) and
numerous junior colleges. These games offer organic opportunities for
campus outreach, inter-college competition, and formation of Young
Libertarian chapters.</p>
<p>---</p>
<h4>III. Challenges &amp; Strategic Fixes</h4>
<table>
<thead>
<tr>
<th>Issue</th>
<th>Solution</th>
</tr>
</thead>
<tbody>
<tr>
<td>Mobile menu bugs</td>
<td>Resolved with custom SCSS + toggle controls</td>
</tr>
<tr>
<td>NationBuilder block editor limitations</td>
<td>Bypassed via direct template injection</td>
</tr>
<tr>
<td>Youth volunteer compliance</td>
<td>Parental consent form with digital signature in development</td>
</tr>
<tr>
<td>Factional baggage (e.g., Mises)</td>
<td>Pivoted focus toward unifying state-level messaging and leadership
autonomy</td>
</tr>
</tbody>
</table>
<p>---</p>
<h4>IV. What=E2=80=99s Gaining Traction</h4>
<ul>
<li>Messaging and tone consistent across platforms (web, email,
Discord, print)</li>
<li>Gamification actively engaging Gen Z and politically disaffected
independents</li>
<li>Early groundwork laid for PAC formation, merch store, and
volunteer pipeline</li>
</ul>
<p>---</p>
<h4>V. Timeline: Key Milestones</h4>
<table>
<thead>
<tr>
<th>Date</th>
<th>Milestone</th>
</tr>
</thead>
<tbody>
<tr>
<td>July 2025</td>
<td>Finalize consent form, begin testing onboarding</td>
</tr>
<tr>
<td>Sept 2025</td>
<td>Full release of Two-Party Monopoly (badges, leaderboard, memory
bank)</td>
</tr>
<tr>
<td>Dec 2025</td>
<td>Test rollout of merch store and Liberty Bucks redemption
system</td>
</tr>
<tr>
<td>LPTX Convention 2026</td>
<td>Fully operational campaign ready for visibility + impact</td>
</tr>
<tr>
<td>Post-Convention</td>
<td>Launch PACs in education and entrepreneurship with designated
treasurers</td>
</tr>
</tbody>
</table>
<p>---</p>
<h4>VI. Confidential IP Safeguards</h4>
<p>The <strong>Candidate Simulator</strong> platform remains
restricted while core mechanics are finalized. Once tested, the
framework can be licensed to other state parties =E2=80=94 enabling
customization to state-specific laws and filing requirements while
also opening the door to educational applications, homeschool use, and
school voucher-compatible civic curricula.</p>
<p>---</p>
<h4>VII. Internal Archive &amp; Sustainability</h4>
<p>We=E2=80=99re building a secure, exportable archive to ensure
continuity:</p>
<ul>
<li>All game rules and logic documentation</li>
<li>Consent + legal forms (minors, NDA)</li>
<li>Volunteer role definitions and onboarding packets</li>
<li>SCSS website notes + tester bug logs</li>
</ul>
<p>---</p>
<p><strong>This campaign isn't just about 2026. It's about building a
future-ready political infrastructure =E2=80=94 one where candidates, donor=
s,
and volunteers are empowered, not dependent. Thank you for being part
of this movement.</strong></p>
</td>
    </tr>
    <!--[if mso 14]>
      <tr style=3D"margin:0;padding:0;">
<td style=3D"padding: 1em 0 0; line-height:
1px;background-color:#fcda4a;"></td>
      </tr>
    <![endif]-->
    <!--[if gt mso 15]>
      <tr style=3D"margin:0;padding:0;">
        <td style=3D"height:0.1pt;background-color:#fcda4a;">
          &nbsp;
        </td>
      </tr>
    <![endif]-->
  </tbody>
</table>


<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"image"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;table-layout:f=
ixed;min-width:100%;width:100%;background-color:#fcda4a;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td style=3D"text-align:left;padding:0
2em;min-width:596px;width:596px;" width=3D"596">
        <div style=3D"display:block;">
            <!--[if mso]>
<img style=3D"vertical-align:middle;" width=3D"596"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/3D_Liberty_Buck.png?1753039403"
/>
            <![endif]-->
            <!--[if !mso]><!-->
<img style=3D"vertical-align:middle;" width=3D"100%"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/3D_Liberty_Buck.png?1753039403">
            <!--<![endif]-->
</div>
</td>    </tr>
  </tbody>
</table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"text"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;background-color:#fcda4a;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <!--[if mso]>
      <tr style=3D"margin:0;padding:0;">
<td style=3D"padding: 1em 0 0; line-height:
1px;background-color:#fcda4a;"></td>
      </tr>
    <![endif]-->
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;background-color:#fcda4a;padding:0.05px
2em;min-width:560px;width:560px;" width=3D"560"><p><strong>The Liberty
Buck Coin</strong><br>Earned through knowledge, not donations. The
Liberty Buck is our way of rewarding civic engagement. Collect 8 by
completing games and campaign actions, and you=E2=80=99ll be eligible for
exclusive merch when our store launches.</p></td>
    </tr>
    <!--[if mso 14]>
      <tr style=3D"margin:0;padding:0;">
<td style=3D"padding: 1em 0 0; line-height:
1px;background-color:#fcda4a;"></td>
      </tr>
    <![endif]-->
    <!--[if gt mso 15]>
      <tr style=3D"margin:0;padding:0;">
        <td style=3D"height:0.1pt;background-color:#fcda4a;">
          &nbsp;
        </td>
      </tr>
    <![endif]-->
  </tbody>
</table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
style=3D"margin:0;padding:0;min-width:100%;width:100%;border-spacing:0;back=
ground-color:#fcda4a;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
      <td style=3D"padding:0 2em;height:32px;">
    </td>
</tr>
  </tbody>
</table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"two-column=
"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;table-layout:f=
ixed;min-width:100%;width:100%;">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td
style=3D"min-width:50%;width:50%;vertical-align:middle;margin:0;padding:0;"
width=3D"332">
       =20

<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"image"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;table-layout:f=
ixed;min-width:100%;width:100%;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td style=3D"text-align:left;padding:1em 1em 1em
2em;min-width:280px;width:280px;" width=3D"280">
        <div style=3D"display:block;">
            <!--[if mso]>
<img style=3D"vertical-align:middle;" width=3D"280"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/T_Shirt_Black_Golden_Rule.png?1753042791"
/>
            <![endif]-->
            <!--[if !mso]><!-->
<img style=3D"vertical-align:middle;" width=3D"100%"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/T_Shirt_Black_Golden_Rule.png?1753042791">
            <!--<![endif]-->
</div>
</td>    </tr>
  </tbody>
</table>
      </td>
<td
style=3D"min-width:50%;width:50%;vertical-align:middle;margin:0;padding:0;"
width=3D"332">
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"text"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <!--[if mso]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;padding:0 2em 0
1em;min-width:280px;width:280px" width=3D"280">
<h3 style=3D"color: #fed000;"><span style=3D"color: #000000;">Merch with a
Message (Local &amp; Scalable)</span></h3>
<p>The upcoming merch line includes a mix of message-forward items =E2=80=
=94
from unity themes like <strong>=E2=80=9COne West Texas=E2=80=9D</strong> an=
d
<strong>=E2=80=9CGolden Rule Governance: Be Nice=E2=80=9D</strong>, to more=
 locally
charged pieces like the <strong>=E2=80=9CX Out Jodey Arrington=E2=80=9D</st=
rong>
shirt, designed to connect with voters here in TX-19.</p>
<p>While these items are tailored to this district, the model behind
them =E2=80=94 using branded, values-driven gear to spark conversations and
signal voter alignment =E2=80=94 can be replicated by other Libertarian
candidates. These shirts don=E2=80=99t just fundraise; they educate, provok=
e,
and build community.</p>
<p>Other campaigns are welcome to adopt this strategy, especially the
=E2=80=9CGolden Rule Governance=E2=80=9D line, which is intentionally left =
open for
wider use across the state. We simply ask that candidates who build on
this messaging acknowledge its origin =E2=80=94 not out of ego, but to
reinforce the broader collaboration we=E2=80=99re trying to build within th=
e
party.</p>
<p><strong><a title=3D"Coming Soon: Merch Store" rel=3D"noopener"
href=3D"https://www.bernardjohnson4congress.com/coming_soon_merch_store?e=
=3D2c8a59b46232ffe020d8ffcaeabbbcd9&amp;utm_source=3Dbernardjohnson4congres=
s&amp;utm_medium=3Demail&amp;utm_campaign=3Dlptx_donors_follow_up&amp;n=3D2=
&amp;test_email=3D1"
target=3D"_blank">Continue reading</a></strong></p>
</td>
    </tr>
    <!--[if mso 14]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <!--[if gt mso 15]>
      <tr style=3D"margin:0;padding:0;">
        <td style=3D"height:0.1pt;">
          &nbsp;
        </td>
      </tr>
    <![endif]-->
  </tbody>
</table>

      </td>
    </tr>
  </tbody>
</table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" width=3D"100%"
style=3D"min-width:100%;width:100%;margin:0;padding:0;">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td
style=3D"width:100%;padding-left:2em;padding-right:2em;padding-top:5px;padd=
ing-bottom:5px;">
<hr style=3D"background:none;height:1px;outline:none;border:0
solid;border-width:2px 0 0 0;">
</td>    </tr>
  </tbody>
</table>  <table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
class=3D"two-column"
style=3D"table-layout:fixed;min-width:100%;width:100%;" width=3D"100%">
    <tbody style=3D"margin:0;padding:0;">
      <tr style=3D"margin:0;padding:0;">
<td
style=3D"min-width:50%;width:50%;vertical-align:top;margin:0;padding:0;"
width=3D"280">
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
class=3D"text"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <!--[if mso]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;padding:0 1em 0
2em;min-width:280px;width:280px" width=3D"280">
<h2><span>IEP for America</span></h2>
<p><span>Over the next several weeks, I'll be unveiling several new
policy initiatives to coincide with Phase 1 of my Individualized
Emancipation Plan (IEP) for America. To review the details, click
below:=C2=A0=C2=A0</span></p>
<p><strong><a title=3D"IEP for America: Phase 1" rel=3D"noopener"
href=3D"https://www.bernardjohnson4congress.com/phase_i?e=3D2c8a59b46232ffe=
020d8ffcaeabbbcd9&amp;utm_source=3Dbernardjohnson4congress&amp;utm_medium=
=3Demail&amp;utm_campaign=3Dlptx_donors_follow_up&amp;n=3D3&amp;test_email=
=3D1"
target=3D"_blank">Continue reading</a></strong></p>
</td>
    </tr>
    <!--[if mso 14]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <!--[if gt mso 15]>
      <tr style=3D"margin:0;padding:0;">
        <td style=3D"height:0.1pt;">
          &nbsp;
        </td>
      </tr>
    <![endif]-->
  </tbody>
</table>

        </td>
<td
style=3D"min-width:50%;width:50%;vertical-align:top;margin:0;padding:0;"
width=3D"280">
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
class=3D"text"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <!--[if mso]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;padding:0 2em 0
1em;min-width:280px;width:280px" width=3D"280">
<h2><span>Visit the Political Games Hub</span></h2>
<p><span>Thank you for your continued support! Please play all three
rounds of "Two-Party Monopoly" along with the "How Bernard Are You?"
quiz and leave a comment.</span></p>
<p><strong><a title=3D"Political Games Hub" rel=3D"noopener"
href=3D"https://www.bernardjohnson4congress.com/political_games?e=3D2c8a59b=
46232ffe020d8ffcaeabbbcd9&amp;utm_source=3Dbernardjohnson4congress&amp;utm_=
medium=3Demail&amp;utm_campaign=3Dlptx_donors_follow_up&amp;n=3D4&amp;test_=
email=3D1"
target=3D"_blank">Continue reading</a></strong></p>
</td>
    </tr>
    <!--[if mso 14]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <!--[if gt mso 15]>
      <tr style=3D"margin:0;padding:0;">
        <td style=3D"height:0.1pt;">
          &nbsp;
        </td>
      </tr>
    <![endif]-->
  </tbody>
</table>

        </td>
      </tr>
      <tr style=3D"margin:0;padding:0;">
<td
style=3D"min-width:50%;width:50%;vertical-align:top;margin:0;padding:0;"
width=3D"280">
        </td>
<td
style=3D"min-width:50%;width:50%;vertical-align:top;margin:0;padding:0;"
width=3D"280">
        </td>
      </tr>
    </tbody>
  </table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"text"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <!--[if mso]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;padding:0.05px
2em;min-width:560px;width:560px;" width=3D"560">
<h2>Final Thoughts...</h2>
<p>We=E2=80=99ve made a lot of progress, from launching the Two-Party Monop=
oly
game to previewing the Liberty Buck coin, and there's more to come. I
know some of this might feel like new territory, especially for those
who=E2=80=99ve been part of the Libertarian movement for decades.</p>
<p>But none of this replaces the hard work that came before. It builds
on it. The tools we=E2=80=99re rolling out =E2=80=94 from the Candidate Sim=
ulator to
Golden Rule Governance are designed to support candidates across Texas
who want to step forward and lead in their own communities.</p>
<p>This isn=E2=80=99t just about one campaign. It=E2=80=99s about planting =
seeds for
something stronger, long-term.</p>
<p>Thanks for being part of this.</p>
<p>=E2=80=94 Bernard</p>
<p>=C2=A0</p>
</td>
    </tr>
    <!--[if mso 14]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <!--[if gt mso 15]>
      <tr style=3D"margin:0;padding:0;">
        <td style=3D"height:0.1pt;">
          &nbsp;
        </td>
      </tr>
    <![endif]-->
  </tbody>
</table>







<table align=3D"center" border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
style=3D"background-color:#fcda4a;min-width:100%;width:100%;">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
      <td align=3D"center" style=3D"padding:1em 2em;">
<table
style=3D"color:#ffffff;font-size:24px;border-radius:4px;border-collapse:ini=
tial;background-color:#000000;">
          <tbody style=3D"margin:0;padding:0;">
            <tr>
<td align=3D"center"
style=3D"color:#ffffff;font-size:24px;text-align:center;position:relative;p=
adding:15px
49.5px;">
<a
style=3D"position:absolute;top:0;left:0;right:0;bottom:0;display:block;"
target=3D"_blank"
href=3D"https://www.bernardjohnson4congress.com/donate?e=3D2c8a59b46232ffe0=
20d8ffcaeabbbcd9&amp;utm_source=3Dbernardjohnson4congress&amp;utm_medium=3D=
email&amp;utm_campaign=3Dlptx_donors_follow_up&amp;n=3D5&amp;test_email=3D1=
"
title=3D"DONATE"></a>
<a
style=3D"color:#ffffff;font-size:24px;text-decoration:none;line-height:1;ma=
rgin:auto;"
target=3D"_blank"
href=3D"https://www.bernardjohnson4congress.com/donate?e=3D2c8a59b46232ffe0=
20d8ffcaeabbbcd9&amp;utm_source=3Dbernardjohnson4congress&amp;utm_medium=3D=
email&amp;utm_campaign=3Dlptx_donors_follow_up&amp;n=3D5&amp;test_email=3D1=
">DONATE</a>
</td>
</tr>          </tbody>
</table>      </td>
    </tr>
  </tbody>
</table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"text"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <!--[if mso]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;padding:0.05px
2em;min-width:560px;width:560px;" width=3D"560">
<h2>Coming Soon...</h2>
<h3>The Candidate Simulator</h3>
<p>Ever wonder what it takes to run for office? This interactive
experience will challenge players and future candidates alike to build
coalitions, survive media storms, and win support, all while trying to
stay true to their principles.</p>
<p><em>Watch for the official launch this fall.</em></p>
</td>
    </tr>
    <!--[if mso 14]>
      <tr style=3D"margin:0;padding:0;">
          <td style=3D"padding: 1em 0 0; line-height: 1px;"></td>
      </tr>
    <![endif]-->
    <!--[if gt mso 15]>
      <tr style=3D"margin:0;padding:0;">
        <td style=3D"height:0.1pt;">
          &nbsp;
        </td>
      </tr>
    <![endif]-->
  </tbody>
</table>


<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" class=3D"image"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;table-layout:f=
ixed;min-width:100%;width:100%;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td style=3D"text-align:left;padding:0
2em;min-width:596px;width:596px;" width=3D"596">
        <div style=3D"display:block;">
            <!--[if mso]>
<img alt=3D"Candidate Simulator Header"
style=3D"vertical-align:middle;" width=3D"596"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/Candidate_Sim_Header.png?1753057005"
/>
            <![endif]-->
            <!--[if !mso]><!-->
<img alt=3D"Candidate Simulator Header"
style=3D"vertical-align:middle;" width=3D"100%"
src=3D"https://assets.nationbuilder.com/bernardjohnson4congress/mailings/10=
0/attachments/original/Candidate_Sim_Header.png?1753057005">
            <!--<![endif]-->
</div>
</td>    </tr>
  </tbody>
</table>
<table align=3D"center" border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
style=3D"margin:0;text-align:center;min-width:100%;width:100%;border-spacin=
g:0;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td align=3D"center" style=3D"padding:1em
2em;min-width:100%;width:100%;border:none;">
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
style=3D"margin:0;text-align:center;border-spacing:0;">
          <tbody style=3D"margin:0;padding:0;">
            <tr style=3D"margin:0;padding:0;">
                <td style=3D"padding:2px;border:none;">
<a
href=3D"https://www.bernardjohnson4congress.com/r?u=3DZ9Bx4TtVDl3z69PIXPCIX=
cu75fFMyF1XhF4de9MXra8&amp;e=3D2c8a59b46232ffe020d8ffcaeabbbcd9&amp;utm_sou=
rce=3Dbernardjohnson4congress&amp;utm_medium=3Demail&amp;utm_campaign=3Dlpt=
x_donors_follow_up&amp;n=3D6&amp;test_email=3D1"
style=3D"text-decoration:none;">
<img style=3D"vertical-align: bottom;" width=3D"24"
height=3D"24"
src=3D"https://3dna-public-assets.s3.amazonaws.com/Mailings/Facebook_grey.p=
ng"
alt=3D"Facebook">
                  </a>
                </td>
                <td style=3D"padding:2px;border:none;">
<a
href=3D"https://www.bernardjohnson4congress.com/r?u=3D6-fyaWqMeMsTrwz9s8VZC=
S30E1mDwh81SQSTsYLu_RE&amp;e=3D2c8a59b46232ffe020d8ffcaeabbbcd9&amp;utm_sou=
rce=3Dbernardjohnson4congress&amp;utm_medium=3Demail&amp;utm_campaign=3Dlpt=
x_donors_follow_up&amp;n=3D7&amp;test_email=3D1"
style=3D"text-decoration:none;">
<img style=3D"vertical-align: bottom;" width=3D"24"
height=3D"24"
src=3D"https://3dna-public-assets.s3.amazonaws.com/Mailings/X_grey.png"
alt=3D"Twitter">
                  </a>
                </td>
                <td style=3D"padding:2px;border:none;">
<a
href=3D"https://www.bernardjohnson4congress.com/r?u=3Di4_JVHysniQwdj5Exs6ew=
pbNZOCBQTC8x-C1xEz1l1A&amp;e=3D2c8a59b46232ffe020d8ffcaeabbbcd9&amp;utm_sou=
rce=3Dbernardjohnson4congress&amp;utm_medium=3Demail&amp;utm_campaign=3Dlpt=
x_donors_follow_up&amp;n=3D8&amp;test_email=3D1"
style=3D"text-decoration:none;">
<img style=3D"vertical-align: bottom;" width=3D"24"
height=3D"24"
src=3D"https://3dna-public-assets.s3.amazonaws.com/Mailings/LinkedIn_grey.p=
ng"
alt=3D"LinkedIn">
                  </a>
                </td>
                <td style=3D"padding:2px;border:none;">
<a
href=3D"https://www.bernardjohnson4congress.com/r?u=3DW0YbBIpSbD9LUVewupI1i=
RrnivYB3djFcS6KNyMVi-k&amp;e=3D2c8a59b46232ffe020d8ffcaeabbbcd9&amp;utm_sou=
rce=3Dbernardjohnson4congress&amp;utm_medium=3Demail&amp;utm_campaign=3Dlpt=
x_donors_follow_up&amp;n=3D9&amp;test_email=3D1"
style=3D"text-decoration:none;">
<img style=3D"vertical-align: bottom;" width=3D"24"
height=3D"24"
src=3D"https://3dna-public-assets.s3.amazonaws.com/Mailings/Instagram_grey.=
png"
alt=3D"Instagram">
                  </a>
                </td>
                <td style=3D"padding:2px;border:none;">
<a
href=3D"https://www.bernardjohnson4congress.com/?e=3D2c8a59b46232ffe020d8ff=
caeabbbcd9&amp;utm_source=3Dbernardjohnson4congress&amp;utm_medium=3Demail&=
amp;utm_campaign=3Dlptx_donors_follow_up&amp;n=3D10&amp;test_email=3D1"
style=3D"text-decoration:none;">
<img style=3D"vertical-align: bottom;" width=3D"24"
height=3D"24"
src=3D"https://3dna-public-assets.s3.amazonaws.com/Mailings/Website_grey.pn=
g"
alt=3D"Website">
                  </a>
                </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0"
style=3D"margin:0;padding:0;border-spacing:0;overflow:hidden;min-width:100%=
;width:100%;table-layout:fixed;"
width=3D"100%">
  <tbody style=3D"margin:0;padding:0;">
    <tr style=3D"margin:0;padding:0;">
<td style=3D"margin:0;padding:1em 2em
0;text-align:center;font-size:1em;">
<p style=3D"font-size: 10px; text-align: center;">Bernard Johnson 4
Congress =C2=B7 2701 Nonesuch Rd., Apt 2107, Abilene, TX 79606, United
States <br>This email was sent to <a>bernardjohnson357@gmail.com</a> =C2=B7
<a href=3D"">Unsubscribe</a></p>
<p style=3D"font-size: 10px; text-align: center;">Created with <a
href=3D"https://www.bernardjohnson4congress.com/r?u=3DNorKDTKRA796h6g5UcFEo=
aI8t1zF8A_qOveDfPoQBz8&amp;e=3D2c8a59b46232ffe020d8ffcaeabbbcd9&amp;utm_sou=
rce=3Dbernardjohnson4congress&amp;utm_medium=3Demail&amp;utm_campaign=3Dlpt=
x_donors_follow_up&amp;n=3D11&amp;test_email=3D1">NationBuilder</a>.
Build the Future.</p>
</td>
    </tr>
  </tbody>
</table>

                    </td>
                  </tr>
                </tbody>
</table>
              </td>
            </tr>
          </tbody>
</table>
        </td>
      </tr>
    </tbody>
</table>
  </div>


<img src=3D"http://email.nationbuilder.com/wf/open?upn=3Du001.5iFfyIJnQrfVJ=
Lm2lfYidK8xiaS15ZPOeXGYeoQ-2Bfd9LMyUbN8BFA0-2F1KZr0zCdrX1a-2B3nentm-2BHPkdI=
FVFg9V4QiPfGTfd8lZOIlxmSCxd8VLJAKcAYLBh9z3FHgLd1hbkPQuVpcy6tFCFzyYyS-2F5tl9=
F7kfe2meOwoIjrvQx-2FzIF9uemIVYWPu379axW5EW4MtWqzNhZ6uTA2RFITmW5QFH708KA8ADa=
4iv5zGfAVb2TXOwIvqMDBj-2ByTW4XjMY99wmcAvjSg5KhPRc134VomvADQ2O6iqaQu9E67RZ-2=
FoMBOCuB5D00-2B3Lce4NbH6uLppirCEx4lryp9T-2F2KE-2BNoojjAT1ZLtpe5dNzJWg3eumVR=
N0SvgVMmU7c3zK-2BcG9pczgdjDhOlshWgqL45vxiFT-2FEPM4Ng9GwVNSJShQ2iTIeC-2BYLYI=
8MD8ivMrynuzJ" alt=3D"" width=3D"1" height=3D"1" border=3D"0" style=3D"heig=
ht:1px !important;width:1px !important;border-width:0 !important;margin-top=
:0 !important;margin-bottom:0 !important;margin-right:0 !important;margin-l=
eft:0 !important;padding-top:0 !important;padding-bottom:0 !important;paddi=
ng-right:0 !important;padding-left:0 !important;"/></body>
</html>
----==_mimepart_6888b4093629a_3d887dc243e--
